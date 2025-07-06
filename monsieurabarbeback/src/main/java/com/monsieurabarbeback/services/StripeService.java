package com.monsieurabarbeback.services;

import com.google.gson.JsonSyntaxException;
import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class StripeService {

    @Value("${stripe.secret.key}")
    private String secretKey;
    @Value("${url.frontend}")
    private String urlFrontend;
    @Value("${secret.endpoint}")
    private String endpointSecret;

    @Autowired
    private CartService cartService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @Autowired 
    private CartRepository cartRepository;
    public Map<String, String> createCheckoutSession(User user) throws StripeException {
        Stripe.apiKey = secretKey;

        Optional<Cart> optionalCart = cartService.getCartByUser(user);

        if (optionalCart.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Votre panier est vide.");
        }

        Cart cart = optionalCart.get();
        Set<CartItem> items = cart.getCartItems();
        if(items.size() == 0 ){
            return Map.of("error", "Problème sur le stock du produit");
        }

        // Vérification des quantités disponibles
        for (CartItem item : items) {
            Product product = item.getProduct();
            if (item.getQuantity() > product.getStock()) {
                cartService.removeItemFromCart(cart, item);
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Le produit '" + product.getName() + "' n'est plus disponible en quantité suffisante et a été retiré de votre panier."
                );
            }
        }

        List<SessionCreateParams.LineItem> lineItems = items.stream()
            .map(item -> {
                Product product = item.getProduct();
                return SessionCreateParams.LineItem.builder()
                    .setQuantity((long) item.getQuantity())
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("eur")
                            .setUnitAmount((long) (product.getPrice() * 100)) // montant en centimes
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName(product.getName())
                                    .build()
                            )
                            .build()
                    )
                    .build();
            })
            .collect(Collectors.toList());
        System.out.println("user : " + user.getId().toString());
        SessionCreateParams params = SessionCreateParams.builder()
            .addAllLineItem(lineItems)
            .setShippingAddressCollection(
                SessionCreateParams.ShippingAddressCollection.builder()
                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.FR)
                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.BE)
                    .build()
            )
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(urlFrontend+"/payement/success")
            .setCancelUrl(urlFrontend+"/payement/cancel")
            .setPaymentIntentData(
                SessionCreateParams.PaymentIntentData.builder()
                    .putMetadata("user_id", user.getId().toString())
                    .build()
            )            
            .build();

        Session session = Session.create(params);

        return Map.of("sessionId", session.getId());
    }

    public ResponseEntity<Void> handlePayement(String payload, String sigHeader) {
        Event event = null;        
        try {
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            // Invalid payload
            System.out.println("⚠️  Webhook error while parsing basic request.");
            
            return ResponseEntity.badRequest().build();
            
        }

        if(endpointSecret != null && sigHeader != null) {
            // Only verify the event if you have an endpoint secret defined.
            // Otherwise use the basic event deserialized with GSON.
            try {
                event = Webhook.constructEvent(
                    payload, sigHeader, endpointSecret
                );
            } catch (SignatureVerificationException e) {
                // Invalid signature
                System.out.println("⚠️  Webhook error while validating signature.");
                return ResponseEntity.status(400).build();
            }
        }
        
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            // Deserialization failed, probably due to an API version mismatch.
            // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
            // instructions on how to handle this case, or return an error here.
            System.out.println("error");
        }
        
        if("payment_intent.succeeded".equals(event.getType())) {
            PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
            // System.out.println("Payment for " + paymentIntent.getAmount() / 100 + "euro succeeded.");
            
            String id = paymentIntent.getMetadata().get("user_id");
            Optional<User> user = userService.getUserById(Long.valueOf(id));
            if (user.isPresent()){
                Cart cart = cartRepository.findByUser(user.get()).orElse(null);
                OrderCreationRequest orderRequest = convertCartToOrderRequest(cart);
                orderService.createOrder(orderRequest, user.get().getUsername());
            }else{
                System.out.println("No user found");
            }
        }
        return ResponseEntity.ok().build();
    };

    public OrderCreationRequest convertCartToOrderRequest(Cart cart) {
        OrderCreationRequest request = new OrderCreationRequest();

        List<OrderCreationRequest.OrderItemRequest> itemRequests = cart.getCartItems().stream().map(cartItem -> {
            OrderCreationRequest.OrderItemRequest itemRequest = new OrderCreationRequest.OrderItemRequest();
            itemRequest.setProductId(cartItem.getProduct().getId());
            itemRequest.setQuantity(cartItem.getQuantity());
            return itemRequest;
        }).toList();

        request.setItems(itemRequests);
        return request;
    };
}

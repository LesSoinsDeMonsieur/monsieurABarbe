package com.monsieurabarbeback.controllers;

import java.util.List;

import com.google.gson.JsonSyntaxException;
import com.monsieurabarbeback.controllers.dto.OrderCreationRequest;
import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartRepository;
import com.monsieurabarbeback.repositories.UserRepository;
import com.monsieurabarbeback.services.OrderService;
import com.monsieurabarbeback.services.StripeService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.net.ApiResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

import com.monsieurabarbeback.services.UserService;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;


@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private StripeService stripeService;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private CartRepository cartRepository;

    String endpointSecret = "whsec_faf173d5a463cf100bfc690000b09bf77f2f5ad94cc89883fac86c0f3149360c";


    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createSession() throws StripeException {
        User user = getCurrentUser();

        Map<String, String> session = stripeService.createCheckoutSession(user);

        return ResponseEntity.ok(session);
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> postMethodName(@RequestBody String payload, @RequestHeader(value = "Stripe-Signature", required = false) String sigHeader) {
        Event event = null;
        System.out.println(sigHeader);
        
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
        
        System.out.println(event.getType());
        if("payment_intent.succeeded".equals(event.getType())) {
            PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
            System.out.println("Payment for " + paymentIntent.getAmount() / 100 + "euro succeeded.");
            
            String id = paymentIntent.getMetadata().get("user_id");
            System.out.println(id);
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
    }

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
    }

}

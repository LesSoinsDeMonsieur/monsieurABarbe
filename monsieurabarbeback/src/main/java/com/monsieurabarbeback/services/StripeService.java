package com.monsieurabarbeback.services;

import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private CartService cartService;

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

        SessionCreateParams params = SessionCreateParams.builder()
            .addAllLineItem(lineItems)
            .setShippingAddressCollection(
                SessionCreateParams.ShippingAddressCollection.builder()
                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.FR)
                    .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.BE)
                    .build()
            )
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:3000/payement/success")
            .setCancelUrl("http://localhost:3000/payement/cancel")
            .build();

        Session session = Session.create(params);

        return Map.of("sessionId", session.getId());
    }
}

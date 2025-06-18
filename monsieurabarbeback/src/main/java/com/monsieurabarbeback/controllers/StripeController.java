package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.repositories.UserRepository;
import com.monsieurabarbeback.services.CartService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.google.gson.JsonSyntaxException;
import com.stripe.model.StripeObject;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;

import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;


@RestController
@RequestMapping("/api/stripe")
public class StripeController {
    
    @Autowired private UserRepository userRepository;
    @Autowired private CartService cartService;

    @Value("${stripe.secret.key}")
    private String secretKey;
    
    @Value("${stripe.endpoint.secret}")
    private String endpointSecret;
    
    // 🔁 Récupérer l'utilisateur connecté via JWT
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }
    @PostMapping("/create-session")
    public ResponseEntity<Map<String, String>> createSession(HttpServletRequest request) throws StripeException {
      Stripe.apiKey = secretKey;

      // Exemple : récupérer le panier via l'utilisateur connecté ou une session
      Optional<Cart> optionalCart = cartService.getCartByUser(this.getCurrentUser());
      
      if (optionalCart.isPresent()) {
          Cart cart = optionalCart.get(); // ✅ tu extrais l'objet ici
          Set<CartItem> items = cart.getCartItems(); // plus d'erreur de type

          List<SessionCreateParams.LineItem> lineItems = items.stream()
            .map((CartItem item) -> {
                Product product = item.getProduct();
                return SessionCreateParams.LineItem.builder()
                    .setQuantity((long) item.getQuantity())
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("eur")
                            .setUnitAmount((long) (product.getPrice() * 100))
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
          
          return ResponseEntity.ok(Map.of("sessionId", session.getId()));
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le panier est vide.");

        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
        String payload;
        Event event;

        try (BufferedReader reader = request.getReader()) {
            payload = reader.lines().collect(Collectors.joining());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to read request body");
        }

        try {
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payload");
        }

        // Désérialisation de l'objet Stripe associé
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to deserialize object");
        }

        switch (event.getType()) {
            case "payment_intent.succeeded":
                PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                System.out.println("✅ Paiement réussi pour : " + paymentIntent.getAmount());
                break;
            case "payment_method.attached":
                PaymentMethod paymentMethod = (PaymentMethod) stripeObject;
                System.out.println("💳 Méthode de paiement attachée : " + paymentMethod.getId());
                break;
            default:
                System.out.println("ℹ️ Type d’événement non géré : " + event.getType());
                break;
        }

        return ResponseEntity.ok("Webhook reçu");
    }
}

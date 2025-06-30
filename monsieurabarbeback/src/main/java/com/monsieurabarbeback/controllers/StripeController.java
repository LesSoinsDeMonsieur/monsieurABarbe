package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.UserRepository;
import com.monsieurabarbeback.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private UserRepository userRepository;

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

}



    // @PostMapping("/webhook")
    // public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
    //     String payload;
    //     Event event;

    //     try (BufferedReader reader = request.getReader()) {
    //         payload = reader.lines().collect(Collectors.joining());
    //     } catch (IOException e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to read request body");
    //     }

    //     try {
    //         event = ApiResource.GSON.fromJson(payload, Event.class);
    //     } catch (JsonSyntaxException e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payload");
    //     }

    //     // Désérialisation de l'objet Stripe associé
    //     EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
    //     StripeObject stripeObject = null;
    //     if (dataObjectDeserializer.getObject().isPresent()) {
    //         stripeObject = dataObjectDeserializer.getObject().get();
    //     } else {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to deserialize object");
    //     }

    //     switch (event.getType()) {
    //         case "payment_intent.succeeded":
    //             PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
    //             System.out.println("✅ Paiement réussi pour : " + paymentIntent.getAmount());
    //             break;
    //         case "payment_method.attached":
    //             PaymentMethod paymentMethod = (PaymentMethod) stripeObject;
    //             System.out.println("💳 Méthode de paiement attachée : " + paymentMethod.getId());
    //             break;
    //         default:
    //             System.out.println("ℹ️ Type d’événement non géré : " + event.getType());
    //             break;
    //     }

    //     return ResponseEntity.ok("Webhook reçu");
    // }
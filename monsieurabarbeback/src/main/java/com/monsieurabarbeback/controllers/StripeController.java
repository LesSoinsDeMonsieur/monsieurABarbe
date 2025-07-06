package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartRepository;
import com.monsieurabarbeback.repositories.UserRepository;
import com.monsieurabarbeback.services.OrderService;
import com.monsieurabarbeback.services.StripeService;
import com.stripe.exception.StripeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.monsieurabarbeback.services.UserService;

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
        return stripeService.handlePayement(payload, sigHeader);
    }

   

}

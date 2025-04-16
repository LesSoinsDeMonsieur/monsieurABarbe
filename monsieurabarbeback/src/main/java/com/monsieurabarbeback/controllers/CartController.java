package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.CartItemDTO;
import com.monsieurabarbeback.controllers.dto.CartItemResponseDTO;
import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartItemRepository;
import com.monsieurabarbeback.repositories.CartRepository;
import com.monsieurabarbeback.repositories.ProductRepository;
import com.monsieurabarbeback.repositories.UserRepository;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;

    // 🔁 Récupère l'utilisateur connecté via le token JWT
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // suppose que le JWT contient l'email
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestBody CartItemDTO request) {
        User user = getCurrentUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));

        Optional<Product> productOpt = productRepository.findById(request.getProductId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Produit introuvable");
        }

        Product product = productOpt.get();

        Optional<CartItem> existingItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.addCartItem(newItem);
        }

        Cart updatedCart = cartRepository.save(cart);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long productId) {
        User user = getCurrentUser();

        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) return ResponseEntity.status(404).body("Panier introuvable");

        Optional<CartItem> itemToRemove = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(productId)).findFirst();
                
        if (itemToRemove.isPresent()) {
            cart.removeCartItem(itemToRemove.get());
            cartItemRepository.delete(itemToRemove.get());
            cartRepository.save(cart);
            return ResponseEntity.ok("Produit retiré du panier");
        } else {
            return ResponseEntity.badRequest().body("Produit non trouvé dans le panier");
        }
    }

@GetMapping
public ResponseEntity<?> getCartForCurrentUser() {
    User user = getCurrentUser();
    Cart cart = cartRepository.findByUser(user).orElse(null);

    if (cart == null) {
        return ResponseEntity.ok(cart); // Retourne un panier vide si l'utilisateur n'en a pas
    }

    return ResponseEntity.ok(cart);  // Retourne directement l'entité Cart avec ses CartItems et les produits sérialisés
}

}

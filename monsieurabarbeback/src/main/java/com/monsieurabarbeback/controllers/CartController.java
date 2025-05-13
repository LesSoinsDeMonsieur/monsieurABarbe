package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.CartItemDTO;
import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartItemRepository;
import com.monsieurabarbeback.repositories.CartRepository;
import com.monsieurabarbeback.repositories.ProductRepository;
import com.monsieurabarbeback.repositories.UserRepository;
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

    // 🔁 Récupérer l'utilisateur connecté via JWT
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // 📥 Ajouter un article au panier (ou incrémenter)
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

    // ➖ Décrémenter la quantité d’un article dans le panier
    @PostMapping("/decrement")
    public ResponseEntity<?> decrementItemQuantity(@RequestBody CartItemDTO request) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) return ResponseEntity.status(404).body("Panier introuvable");

        Optional<CartItem> itemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();

        if (itemOpt.isPresent()) {
            CartItem item = itemOpt.get();
            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
                cartItemRepository.save(item);
            } else {
                cart.removeCartItem(item);
                cartItemRepository.delete(item);
            }
            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.badRequest().body("Produit non trouvé dans le panier");
        }
    }

    // ❌ Supprimer un article du panier via CartItem ID
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartItemId) {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) return ResponseEntity.status(404).body("Panier introuvable");

        Optional<CartItem> itemToRemove = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst();

        if (itemToRemove.isPresent()) {
            cart.removeCartItem(itemToRemove.get());
            cartItemRepository.delete(itemToRemove.get());
            cartRepository.save(cart);
            return ResponseEntity.ok("Produit retiré du panier");
        } else {
            return ResponseEntity.badRequest().body("Produit non trouvé dans le panier");
        }
    }

    // 🛒 Récupérer le panier utilisateur
    @GetMapping
    public ResponseEntity<?> getCartForCurrentUser() {
        User user = getCurrentUser();
        Cart cart = cartRepository.findByUser(user).orElse(null);
        return ResponseEntity.ok(cart);
    }
}

package com.monsieurabarbeback.services;

import com.monsieurabarbeback.entities.Cart;
import com.monsieurabarbeback.entities.CartItem;
import com.monsieurabarbeback.entities.User;
import com.monsieurabarbeback.repositories.CartRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

import com.monsieurabarbeback.repositories.CartItemRepository;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    public Optional<Cart> getCartByUser(User user) {
        return cartRepository.findByUser(user);
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    public void removeItemFromCart(Cart cart, CartItem item) {
        cart.removeCartItem(item);
        cartItemRepository.delete(item);
        cartRepository.save(cart);
    }

    
}

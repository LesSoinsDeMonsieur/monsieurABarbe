package com.monsieurabarbeback.dataInit;

import com.monsieurabarbeback.entities.*;
import com.monsieurabarbeback.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class DatabaseInitializer {

    @Bean
    @Profile("dev") // Exécuter uniquement en environnement de développement
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            ProductRepository productRepository,
            BoxRepository boxRepository,
            CartRepository cartRepository,
            OrderRepository orderRepository,
            BoxItemRepository boxItemRepository,
            CartItemRepository cartItemRepository,
            OrderItemRepository orderItemRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // Vérifier si la base de données est déjà initialisée
            if (userRepository.count() > 0) {
                System.out.println("La base de données contient déjà des données, initialisation ignorée.");
                return;
            }

            System.out.println("Initialisation de la base de données...");

            // Création des utilisateurs
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setEmail("admin");
            admin.setRole(Role.ROLE_ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setEmail("user@example.com");
            user.setRole(Role.ROLE_USER);
            user.setEnabled(true);
            userRepository.save(user);

            System.out.println("Utilisateurs créés");

            // Création des produits
            Product product1 = new Product();
            product1.setName("Huile à barbe premium");
            product1.setDescription("Huile à barbe 100% naturelle pour une barbe douce et brillante");
            product1.setPrice(19.99);
            product1.setStock(100);
            product1.setImageUrl("/images/huile-barbe.jpg");
            productRepository.save(product1);

            Product product2 = new Product();
            product2.setName("Brosse en poils de sanglier");
            product2.setDescription("Brosse de qualité supérieure pour discipliner votre barbe");
            product2.setPrice(24.99);
            product2.setStock(50);
            product2.setImageUrl("/images/brosse-barbe.jpg");
            productRepository.save(product2);

            Product product3 = new Product();
            product3.setName("Baume à barbe nourrissant");
            product3.setDescription("Baume hydratant qui dompte et nourrit votre barbe");
            product3.setPrice(15.99);
            product3.setStock(75);
            product3.setImageUrl("/images/baume-barbe.jpg");
            productRepository.save(product3);

            System.out.println("Produits créés");

            // Création des boxes
            Box box1 = new Box();
            box1.setName("Kit débutant barbe");
            box1.setDescription("Tout ce dont vous avez besoin pour commencer à prendre soin de votre barbe");
            box1.setPrice(49.99);
            box1.setImageUrl("/images/kit-debutant.jpg");
            boxRepository.save(box1);

            Box box2 = new Box();
            box2.setName("Kit premium barbe");
            box2.setDescription("L'ensemble ultime pour une barbe parfaite");
            box2.setPrice(89.99);
            box2.setImageUrl("/images/kit-premium.jpg");
            boxRepository.save(box2);

            System.out.println("Boxes créées");

            // Création des box items
            BoxItem boxItem1 = new BoxItem();
            boxItem1.setBox(box1);
            boxItem1.setProduct(product1);
            boxItem1.setQuantity(1);
            boxItemRepository.save(boxItem1);

            BoxItem boxItem2 = new BoxItem();
            boxItem2.setBox(box1);
            boxItem2.setProduct(product3);
            boxItem2.setQuantity(1);
            boxItemRepository.save(boxItem2);

            BoxItem boxItem3 = new BoxItem();
            boxItem3.setBox(box2);
            boxItem3.setProduct(product1);
            boxItem3.setQuantity(1);
            boxItemRepository.save(boxItem3);

            BoxItem boxItem4 = new BoxItem();
            boxItem4.setBox(box2);
            boxItem4.setProduct(product2);
            boxItem4.setQuantity(1);
            boxItemRepository.save(boxItem4);

            BoxItem boxItem5 = new BoxItem();
            boxItem5.setBox(box2);
            boxItem5.setProduct(product3);
            boxItem5.setQuantity(1);
            boxItemRepository.save(boxItem5);

            System.out.println("Box items créés");

            // Création du panier pour l'utilisateur
            Cart cart = new Cart(user);
            cartRepository.save(cart);

            // Ajout d'articles au panier
            CartItem cartItem1 = new CartItem();
            cartItem1.setCart(cart);
            cartItem1.setProduct(product1);
            cartItem1.setQuantity(2);
            cartItemRepository.save(cartItem1);

            System.out.println("Panier créé");

            // Création d'une commande
            Order order = new Order();
            order.setUser(user);
            order.setStatus(OrderStatus.PENDING);
            order.setTotal(product2.getPrice() + product3.getPrice());
            order.setCreatedAt(LocalDateTime.now());
            orderRepository.save(order);

            // Ajout d'articles à la commande
            OrderItem orderItem1 = new OrderItem();
            orderItem1.setOrder(order);
            orderItem1.setProduct(product2);
            orderItem1.setQuantity(1);
            orderItem1.setUnitPrice(product2.getPrice());
            orderItemRepository.save(orderItem1);

            OrderItem orderItem2 = new OrderItem();
            orderItem2.setOrder(order);
            orderItem2.setProduct(product3);
            orderItem2.setQuantity(1);
            orderItem2.setUnitPrice(product3.getPrice());
            orderItemRepository.save(orderItem2);

            System.out.println("Commande créée");

            System.out.println("Initialisation de la base de données terminée !");
        };
    }
}
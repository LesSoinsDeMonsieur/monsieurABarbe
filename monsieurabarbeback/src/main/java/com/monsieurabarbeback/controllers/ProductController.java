package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.ProductDTO;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")  // La route de base est déjà /api/products
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping 
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        // Conversion du DTO en entité Product
        Product product = new Product(
            null,  // L'ID sera généré automatiquement
            productDTO.getName(),
            productDTO.getDescription(),
            productDTO.getPrice(),
            productDTO.getStock(),
            productDTO.getImageUrl()
        );

        // Appel au service pour sauvegarder le produit
        Product createdProduct = productService.createProduct(product);

        // Retourne une réponse contenant le produit créé (ou un DTO si nécessaire)
        ProductDTO createdProductDTO = new ProductDTO(
            createdProduct.getName(),
            createdProduct.getDescription(),
            createdProduct.getPrice(),
            createdProduct.getStock(),
            createdProduct.getImageUrl()
        );

        return ResponseEntity.status(201).body(createdProductDTO);  // Utilise 201 pour la création
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Product>> createMultipleProducts(@RequestBody List<ProductDTO> productDTOs) {
        List<Product> savedProducts = productDTOs.stream()
                .map(dto -> {
                    Product product = new Product();
                    product.setName(dto.getName());
                    product.setDescription(dto.getDescription());
                    product.setPrice(dto.getPrice());
                    product.setStock(dto.getStock());
                    product.setImageUrl(dto.getImageUrl());
                    return productService.createProduct(product);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(savedProducts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

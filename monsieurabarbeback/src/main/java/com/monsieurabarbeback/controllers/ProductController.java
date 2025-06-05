package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.controllers.dto.ProductDTO;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.ProductImage;
import com.monsieurabarbeback.services.ProductImageService;
import com.monsieurabarbeback.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductImageService productImageService;

    // ----- Produits

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
        Product product = new Product(
            null,
            productDTO.getName(),
            productDTO.getDescription(),
            productDTO.getPrice(),
            productDTO.getStock(),
            productDTO.getImageUrl()
        );
        Product createdProduct = productService.createProduct(product);

        ProductDTO createdProductDTO = new ProductDTO(
            createdProduct.getId(),
            createdProduct.getName(),
            createdProduct.getDescription(),
            createdProduct.getPrice(),
            createdProduct.getStock(),
            createdProduct.getImageUrl()
        );

        return ResponseEntity.status(201).body(createdProductDTO);
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
        productImageService.deleteAllProductImage(id);
        return ResponseEntity.noContent().build();
    }

    // ----- Images

    // Upload images produit
    @PostMapping("/{productId}/images")
    public ResponseEntity<?> uploadProductImages(
            @PathVariable Long productId,
            @RequestParam("images") MultipartFile[] imageFiles
    ) throws IOException {
        productImageService.uploadImages(productId, imageFiles);
        return ResponseEntity.ok("Images uploadées avec succès !");
    }

    // Récupérer les images d'un produit
    @GetMapping("/{productId}/images")
    public ResponseEntity<List<ProductImage>> getProductImages(@PathVariable Long productId) {
        List<ProductImage> images = productImageService.getImagesByProduct(productId);
        return ResponseEntity.ok(images);
    }

    // Supprimer une image spécifique
    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<?> deleteProductImage(@PathVariable Long imageId) throws IOException {
        productImageService.deleteImage(imageId);
        return ResponseEntity.ok("Image supprimée avec succès !");
    }

    // Nettoyer les fichiers orphelins
    @DeleteMapping("/images/clean-orphans")
    public ResponseEntity<?> cleanOrphanFiles() throws IOException {
        productImageService.cleanOrphanFiles();
        return ResponseEntity.ok("Fichiers orphelins nettoyés.");
    }
}

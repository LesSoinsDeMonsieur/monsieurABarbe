package com.monsieurabarbeback.services;

import com.monsieurabarbeback.controllers.dto.ProductImageDTO;
import com.monsieurabarbeback.entities.Product;
import com.monsieurabarbeback.entities.ProductImage;
import com.monsieurabarbeback.repositories.ProductImageRepository;
import com.monsieurabarbeback.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    @Value("${app.upload.dir}")
    private String uploadDirectory;

    public void uploadImages(Long productId, MultipartFile[] imageFiles) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit introuvable !"));

        Path path = Paths.get(uploadDirectory);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        for (MultipartFile file : imageFiles) {
            String sanitizedFilename = sanitizeFilename(UUID.randomUUID() + "_" + file.getOriginalFilename());
            Path destinationFile = path.resolve(sanitizedFilename).normalize();
            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            ProductImage productImage = new ProductImage();
            productImage.setProduct(product);
            productImage.setFileName(sanitizedFilename);
            productImage.setFilePath(destinationFile.toString());

            productImageRepository.save(productImage);
        }
    }
public List<ProductImage> getImagesByProduct(Long productId) {
    return productImageRepository.findByProductId(productId).stream()
            .map(image -> {
                ProductImage dto = new ProductImage();
                dto.setId(image.getId());
                dto.setFileName(image.getFileName());
                dto.setFilePath(generateImageUrl(image.getFileName()));
                return dto;
            })
            .collect(Collectors.toList());
}


    public void deleteImage(Long imageId) throws IOException {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image introuvable !"));

        Path imagePath = Paths.get(uploadDirectory).resolve(image.getFileName()).normalize();
        if (Files.exists(imagePath)) {
            Files.delete(imagePath);
        }

        productImageRepository.delete(image);
    }

    public void deleteAllProductImage(Long productId){
        List<ProductImage> images = productImageRepository.findByProductId(productId);
        images.forEach(image -> 
            productImageRepository.delete(image)
        );
    }

    public void cleanOrphanFiles() throws IOException {
        Path uploadPath = Paths.get(uploadDirectory);
        if (!Files.exists(uploadPath)) return;

        List<String> registeredFilenames = productImageRepository.findAll().stream()
                .map(ProductImage::getFileName)
                .collect(Collectors.toList());

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(uploadPath)) {
            for (Path filePath : stream) {
                if (!registeredFilenames.contains(filePath.getFileName().toString())) {
                    Files.delete(filePath);
                }
            }
        }
    }

    private String sanitizeFilename(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
    }

    private String generateImageUrl(String filename) {
        return "/uploads/products/" + filename;
    }
}

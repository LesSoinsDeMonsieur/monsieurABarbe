package com.monsieurabarbeback.services;

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
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    @Value("${app.upload.dir}")  // Lien vers ton dossier de stockage des fichiers
    private String uploadDirectory; // Utilisation de @Value pour récupérer la configuration d'un fichier properties

    public void uploadImages(Long productId, MultipartFile[] imageFiles) throws IOException {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Produit introuvable !");
        }

        Product product = productOpt.get();

        // Créer le dossier si nécessaire
        Path path = Paths.get(uploadDirectory);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        for (MultipartFile file : imageFiles) {
            String sanitizedFilename = sanitizeFilename(UUID.randomUUID() + "_" + file.getOriginalFilename());
            Path destinationFile = Paths.get(uploadDirectory).resolve(sanitizedFilename).normalize();

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            ProductImage productImage = new ProductImage();
            productImage.setProduct(product);
            productImage.setFilename(sanitizedFilename);  // Enregistre le nom de fichier
            productImageRepository.save(productImage);
        }
    }

    public List<ProductImage> getImagesByProduct(Long productId) {
        List<ProductImage> images = productImageRepository.findByProductId(productId);
        // Génère l'URL complète pour chaque image
        for (ProductImage image : images) {
            image.setImageUrl(generateImageUrl(image.getFilename())); // Ajoute l'URL complète pour l'image
        }
        return images;
    }

    public void deleteImage(Long imageId) throws IOException {
        Optional<ProductImage> imageOpt = productImageRepository.findById(imageId);
        if (imageOpt.isPresent()) {
            ProductImage image = imageOpt.get();
            Path imagePath = Paths.get(uploadDirectory).resolve(image.getFilename()).normalize();

            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }

            productImageRepository.delete(image);
        }
    }

public void cleanOrphanFiles() throws IOException {
    Path uploadPath = Paths.get(uploadDirectory);
    if (!Files.exists(uploadPath)) return;

    // Liste des fichiers enregistrés en base de données
    List<String> registeredFilenames = productImageRepository.findAll()
            .stream()
            .map(ProductImage::getFilename)  // Accès à l'attribut filename
            .collect(Collectors.toList());  // Collecte les noms de fichiers dans une liste

    try (DirectoryStream<Path> stream = Files.newDirectoryStream(uploadPath)) {
        for (Path filePath : stream) {
            // Si le fichier n'est pas enregistré, le supprimer
            if (!registeredFilenames.contains(filePath.getFileName().toString())) {
                Files.delete(filePath);
            }
        }
    }
}


    // Fonction de sanitation des noms de fichiers
    private String sanitizeFilename(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
    }

    // Générer l'URL d'accès à l'image
    private String generateImageUrl(String filename) {
        // Si tu souhaites un accès public via HTTP (serveur local), tu peux générer l'URL comme suit
        return "/uploads/products/" + filename;
    }
}

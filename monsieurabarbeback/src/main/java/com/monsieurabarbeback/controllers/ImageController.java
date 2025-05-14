package com.monsieurabarbeback.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;

@Controller
public class ImageController {

    private final String uploadDir = "uploads/products/";

    @GetMapping("/uploads/products/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        // Résoudre le chemin du fichier
        Path imagePath = Paths.get(uploadDir).resolve(filename).normalize();
        Resource resource = new UrlResource(imagePath.toUri());

        // Vérifier si le fichier existe
        if (!Files.exists(imagePath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Déterminer le type MIME du fichier
        String mimeType = Files.probeContentType(imagePath);
        if (mimeType == null) {
            mimeType = "application/octet-stream"; // Valeur par défaut si le type MIME est inconnu
        }

        // S'assurer qu'on répond avec le bon type MIME
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, mimeType)  // Type MIME dynamique en fonction de l'extension
                .body(resource);
    }
}

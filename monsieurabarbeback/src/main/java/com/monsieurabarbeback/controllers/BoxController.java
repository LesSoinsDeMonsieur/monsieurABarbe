package com.monsieurabarbeback.controllers;

import com.monsieurabarbeback.entities.Box;
import com.monsieurabarbeback.services.BoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boxes")
@RequiredArgsConstructor
public class BoxController {
    private final BoxService boxService;

    @GetMapping
    public List<Box> getAllBoxes() {
        return boxService.getAllBoxes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Box> getBoxById(@PathVariable Long id) {
        return boxService.getBoxById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Box createBox(@RequestBody Box box) {
        return boxService.createBox(box);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Box> updateBox(@PathVariable Long id, @RequestBody Box box) {
        return ResponseEntity.ok(boxService.updateBox(id, box));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBox(@PathVariable Long id) {
        boxService.deleteBox(id);
        return ResponseEntity.noContent().build();
    }
}

package com.monsieurabarbeback.services;

import com.monsieurabarbeback.entities.Box;
import com.monsieurabarbeback.repositories.BoxRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoxService {
    private final BoxRepository boxRepository;

    public List<Box> getAllBoxes() {
        return boxRepository.findAll();
    }

    public Optional<Box> getBoxById(Long id) {
        return boxRepository.findById(id);
    }

    public Box createBox(Box box) {
        return boxRepository.save(box);
    }

    public Box updateBox(Long id, Box updatedBox) {
        return boxRepository.findById(id).map(box -> {
            box.setName(updatedBox.getName());
            box.setDescription(updatedBox.getDescription());
            box.setPrice(updatedBox.getPrice());
            box.setImageUrl(updatedBox.getImageUrl());
            return boxRepository.save(box);
        }).orElseThrow(() -> new RuntimeException("Box not found"));
    }

    public void deleteBox(Long id) {
        boxRepository.deleteById(id);
    }
}

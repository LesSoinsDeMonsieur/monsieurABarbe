package com.monsieurabarbeback.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"boxItems"})
@Entity
@Table(name = "boxes")
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double price;

    private String imageUrl;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("box-boxitems")
    private Set<BoxItem> boxItems = new HashSet<>();
    
    // Méthodes helper pour gérer la relation bidirectionnelle
    public void addBoxItem(BoxItem boxItem) {
        boxItems.add(boxItem);
        boxItem.setBox(this);
    }
    
    public void removeBoxItem(BoxItem boxItem) {
        boxItems.remove(boxItem);
        boxItem.setBox(null);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Box)) return false;
        Box box = (Box) o;
        return id != null && id.equals(box.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
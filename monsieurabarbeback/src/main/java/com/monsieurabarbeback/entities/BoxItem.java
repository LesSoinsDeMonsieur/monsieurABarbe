package com.monsieurabarbeback.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"box", "product"})
@Entity
@Table(name = "box_items")
public class BoxItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "box_id", nullable = false)
    @JsonBackReference("box-boxitems")
    private Box box;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference("product-boxitems")
    private Product product;

    @Column(nullable = false)
    private Integer quantity;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BoxItem)) return false;
        BoxItem boxItem = (BoxItem) o;
        return id != null && id.equals(boxItem.getId());
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
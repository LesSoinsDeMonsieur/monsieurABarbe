package com.monsieurabarbeback.repositories;

import com.monsieurabarbeback.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);

    List<Product> findByNameContainingIgnoreCase(String keyword);
}

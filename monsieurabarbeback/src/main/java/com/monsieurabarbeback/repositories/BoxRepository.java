package com.monsieurabarbeback.repositories;

import com.monsieurabarbeback.entities.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxRepository extends JpaRepository<Box, Long> {
    boolean existsByName(String name);
}

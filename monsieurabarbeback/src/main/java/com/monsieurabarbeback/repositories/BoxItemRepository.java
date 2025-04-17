package com.monsieurabarbeback.repositories;

import com.monsieurabarbeback.entities.BoxItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxItemRepository extends JpaRepository<BoxItem, Long> {
}

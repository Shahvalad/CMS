package com.champions.repositories;

import com.champions.models.Champion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChampionsRepository extends JpaRepository<Champion, Long> {
}

package com.champions.services;

import com.champions.models.Champion;
import java.util.List;

public interface ChampionService {
     List<Champion> getAllChampions();
     Champion getChampionById(Long id);
     Champion createChampion(Champion champion);
     Champion updateChampion(Long id,Champion champion);
     void deleteChampion(Long id);
}

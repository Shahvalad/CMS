package com.champions.services.Impl;

import com.champions.models.Champion;
import com.champions.repositories.ChampionsRepository;
import com.champions.services.ChampionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChampionsServiceImpl implements ChampionService {

    private final ChampionsRepository championsRepository;
    public ChampionsServiceImpl(ChampionsRepository championsRepository) {
        this.championsRepository = championsRepository;
    }

    @Override
    public List<Champion> getAllChampions() {
        return championsRepository.findAll();
    }

    @Override
    public Champion getChampionById(Long id) {
        return championsRepository.findById(id).orElse(null);
    }

    @Override
    public Champion createChampion(Champion champion) {
        return championsRepository.save(champion);
    }

    @Override
    public Champion updateChampion(Long id, Champion champion) {
        if (!championsRepository.existsById(id)) {
            throw new RuntimeException("Champion not found with id: " + id);
        }
        champion.setId(id);
        return championsRepository.save(champion);
    }

    @Override
    public void deleteChampion(Long id) {
        if (!championsRepository.existsById(id)) {
            throw new RuntimeException("Champion not found with id: " + id);
        }
        championsRepository.deleteById(id);
    }
}

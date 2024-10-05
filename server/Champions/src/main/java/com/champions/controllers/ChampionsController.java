package com.champions.controllers;

import com.champions.models.Champion;
import com.champions.services.ChampionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/champions")
public class ChampionsController {
    private final ChampionService championService;

    public ChampionsController(ChampionService championService) {
        this.championService = championService;
    }

    @GetMapping
    public List<Champion> getAllChampions() {
        return championService.getAllChampions();
    }

    @GetMapping("/{id}")
    public Champion getChampionById(@PathVariable Long id) {
        return championService.getChampionById(id);
    }

    @PostMapping
    public Champion createChampion(@RequestBody Champion champion) {
        return championService.createChampion(champion);
    }

    @PutMapping("/{id}")
    public Champion updateChampion(@PathVariable Long id, @RequestBody Champion champion) {
        return championService.updateChampion(id, champion);
    }

    @DeleteMapping("/{id}")
    public void deleteChampion(@PathVariable Long id) {
        championService.deleteChampion(id);
    }

}

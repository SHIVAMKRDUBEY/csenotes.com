package com.csenotes.controller;


import com.csenotes.entity.Ads;
import com.csenotes.service.AdsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdsController {
    private final AdsService adsService;

    public AdsController(AdsService adsService) {
        this.adsService = adsService;
    }

    @GetMapping
    public List<Ads> getAllAds() {
        return adsService.getAllAds();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ads> getAdById(@PathVariable Long id) {
        return adsService.getAdById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Ads createAd(@RequestBody Ads ad) {
        return adsService.saveAd(ad);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ads> updateAd(@PathVariable Long id, @RequestBody Ads ad) {
        return adsService.getAdById(id)
                .map(existingAd -> {
                    ad.setId(existingAd.getId());
                    return ResponseEntity.ok(adsService.saveAd(ad));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        adsService.deleteAd(id);
        return ResponseEntity.noContent().build();
    }
}


package com.csenotes.controller;


import com.csenotes.entity.Affiliate;
import com.csenotes.service.AffiliateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affiliate")
public class AffiliateController {

    private final AffiliateService affiliateService;

    public AffiliateController(AffiliateService affiliateService) {
        this.affiliateService = affiliateService;
    }

    @GetMapping
    public List<Affiliate> getAllAffiliates() {
        return affiliateService.getAllAffiliates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Affiliate> getAffiliateById(@PathVariable Long id) {
        return affiliateService.getAffiliateById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Affiliate createAffiliate(@RequestBody Affiliate affiliate) {
        return affiliateService.saveAffiliate(affiliate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Affiliate> updateAffiliate(@PathVariable Long id, @RequestBody Affiliate affiliate) {
        return affiliateService.getAffiliateById(id)
                .map(existing -> {
                    affiliate.setId(existing.getId());
                    return ResponseEntity.ok(affiliateService.saveAffiliate(affiliate));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAffiliate(@PathVariable Long id) {
        affiliateService.deleteAffiliate(id);
        return ResponseEntity.noContent().build();
    }
}


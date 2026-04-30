package com.csenotes.controller;


import com.csenotes.entity.Sponsorship;
import com.csenotes.service.SponsorshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsorship")
public class SponsorshipController {

    private final SponsorshipService sponsorshipService;

    public SponsorshipController(SponsorshipService sponsorshipService) {
        this.sponsorshipService = sponsorshipService;
    }

    @GetMapping
    public List<Sponsorship> getAllSponsorships() {
        return sponsorshipService.getAllSponsorships();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sponsorship> getSponsorshipById(@PathVariable Long id) {
        return sponsorshipService.getSponsorshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Sponsorship createSponsorship(@RequestBody Sponsorship sponsorship) {
        return sponsorshipService.saveSponsorship(sponsorship);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sponsorship> updateSponsorship(@PathVariable Long id, @RequestBody Sponsorship sponsorship) {
        return sponsorshipService.getSponsorshipById(id)
                .map(existing -> {
                    sponsorship.setId(existing.getId());
                    return ResponseEntity.ok(sponsorshipService.saveSponsorship(sponsorship));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSponsorship(@PathVariable Long id) {
        sponsorshipService.deleteSponsorship(id);
        return ResponseEntity.noContent().build();
    }
}


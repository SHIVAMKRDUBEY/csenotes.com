package com.csenotes.service;

import com.csenotes.entity.Sponsorship;

import java.util.List;
import java.util.Optional;

public interface SponsorshipService {
    List<Sponsorship> getAllSponsorships();
    Optional<Sponsorship> getSponsorshipById(Long id);
    Sponsorship saveSponsorship(Sponsorship sponsorship);
    void deleteSponsorship(Long id);
}

package com.csenotes.service.impl;

import com.csenotes.entity.Sponsorship;
import com.csenotes.repository.SponsorshipRepository;
import com.csenotes.service.SponsorshipService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SponsorshipServiceImpl implements SponsorshipService {

    private final SponsorshipRepository sponsorshipRepository;

    public SponsorshipServiceImpl(SponsorshipRepository sponsorshipRepository) {
        this.sponsorshipRepository = sponsorshipRepository;
    }

    @Override
    public List<Sponsorship> getAllSponsorships() {
        return sponsorshipRepository.findAll();
    }

    @Override
    public Optional<Sponsorship> getSponsorshipById(Long id) {
        return sponsorshipRepository.findById(id);
    }

    @Override
    public Sponsorship saveSponsorship(Sponsorship sponsorship) {
        return sponsorshipRepository.save(sponsorship);
    }

    @Override
    public void deleteSponsorship(Long id) {
        sponsorshipRepository.deleteById(id);
    }
}

package com.csenotes.service.impl;

import com.csenotes.entity.Affiliate;
import com.csenotes.repository.AffiliateRepository;
import com.csenotes.service.AffiliateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AffiliateServiceImpl implements AffiliateService {

    private final AffiliateRepository affiliateRepository;

    public AffiliateServiceImpl(AffiliateRepository affiliateRepository) {
        this.affiliateRepository = affiliateRepository;
    }

    @Override
    public List<Affiliate> getAllAffiliates() {
        return affiliateRepository.findAll();
    }

    @Override
    public Optional<Affiliate> getAffiliateById(Long id) {
        return affiliateRepository.findById(id);
    }

    @Override
    public Affiliate saveAffiliate(Affiliate affiliate) {
        return affiliateRepository.save(affiliate);
    }

    @Override
    public void deleteAffiliate(Long id) {
        affiliateRepository.deleteById(id);
    }
}

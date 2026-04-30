package com.csenotes.service;

import com.csenotes.entity.Affiliate;

import java.util.List;
import java.util.Optional;

public interface AffiliateService {
    List<Affiliate> getAllAffiliates();
    Optional<Affiliate> getAffiliateById(Long id);
    Affiliate saveAffiliate(Affiliate affiliate);
    void deleteAffiliate(Long id);
}

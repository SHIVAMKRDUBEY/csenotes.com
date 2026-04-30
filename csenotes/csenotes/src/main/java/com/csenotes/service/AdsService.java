package com.csenotes.service;

import com.csenotes.entity.Ads;

import java.util.List;
import java.util.Optional;

public interface AdsService {
    List<Ads> getAllAds();
    Optional<Ads> getAdById(Long id);
    Ads saveAd(Ads ad);
    void deleteAd(Long id);
}

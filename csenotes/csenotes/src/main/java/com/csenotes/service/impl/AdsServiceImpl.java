package com.csenotes.service.impl;

import com.csenotes.entity.Ads;
import com.csenotes.repository.AdsRepository;
import com.csenotes.service.AdsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdsServiceImpl implements AdsService {

    private final AdsRepository adsRepository;

    public AdsServiceImpl(AdsRepository adsRepository) {
        this.adsRepository = adsRepository;
    }

    @Override
    public List<Ads> getAllAds() {
        return adsRepository.findAll();
    }

    @Override
    public Optional<Ads> getAdById(Long id) {
        return adsRepository.findById(id);
    }

    @Override
    public Ads saveAd(Ads ad) {
        return adsRepository.save(ad);
    }

    @Override
    public void deleteAd(Long id) {
        adsRepository.deleteById(id);
    }
}

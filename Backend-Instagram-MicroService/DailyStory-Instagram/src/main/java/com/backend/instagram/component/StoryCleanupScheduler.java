package com.backend.instagram.component;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.backend.instagram.repository.StoryRepository;

@Component
public class StoryCleanupScheduler {

    @Autowired
    private StoryRepository storyRepository;

    @Scheduled(fixedRate = 3600000) // Every hour
    public void cleanupExpiredStories() {
        storyRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}

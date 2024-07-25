package com.backend.instagram.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.instagram.model.Story;

public interface StoryRepository  extends JpaRepository<Story, Integer>{

	 List<Story> findByExpiresAtAfter(LocalDateTime now);

	  void deleteByExpiresAtBefore(LocalDateTime dateTime);
}

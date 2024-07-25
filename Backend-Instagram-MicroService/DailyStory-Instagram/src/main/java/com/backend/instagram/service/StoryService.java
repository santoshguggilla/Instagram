package com.backend.instagram.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


public interface StoryService {
	
	public ResponseEntity<Object> saveStory(int userId, MultipartFile file);

	public ResponseEntity<Object> getUserStory(int storyId);

	public ResponseEntity<Object> getAllStories();

}

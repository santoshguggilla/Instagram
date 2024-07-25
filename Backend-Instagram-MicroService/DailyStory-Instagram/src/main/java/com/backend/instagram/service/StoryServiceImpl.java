package com.backend.instagram.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Base64;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.Story;
import com.backend.instagram.repository.StoryRepository;

@Service
public class StoryServiceImpl implements StoryService {

	@Autowired
	private StoryRepository storyRepository;

	@Override
	public ResponseEntity<Object> saveStory(int userId, MultipartFile file) {
		try {

			Story story = new Story();
			story.setUserId(userId);
			String fileName = file.getOriginalFilename();
			String extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

			// Convert file to Base64
			String base64String = "";
			try (InputStream inputStream = file.getInputStream();
					ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
				IOUtils.copy(inputStream, baos);
				byte[] bytes = baos.toByteArray();
				base64String = Base64.getEncoder().encodeToString(bytes);
			}

			// Save Base64 string and other post details
			if (extension.equals(".jpg") || extension.equals(".png") || extension.equals(".jpeg")) {
				story.setImage(base64String);
			} else if (extension.equals(".mp4") || extension.equals(".avi") || extension.equals(".mov")) {
				story.setVideo(base64String);
			} else {
				throw new IllegalArgumentException("Unsupported file type");
			}
			story.setCreatedAt(LocalDateTime.now());
			story.setExpiresAt(LocalDateTime.now().plusHours(24));
			return ResponseEntity.status(200).body(storyRepository.save(story));
		} catch (Exception ex) {
			return ResponseEntity.status(500).body(ex);
		}
	}

	@Override
	public ResponseEntity<Object> getUserStory(int storyId) {
		try {
			return ResponseEntity.status(200).body(storyRepository.findById(storyId).get());
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Found");
		}
	}

	@Override
	public ResponseEntity<Object> getAllStories() {

		try {
			return ResponseEntity.status(200).body(storyRepository.findByExpiresAtAfter(LocalDateTime.now()));
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Found");
		}
	}

}

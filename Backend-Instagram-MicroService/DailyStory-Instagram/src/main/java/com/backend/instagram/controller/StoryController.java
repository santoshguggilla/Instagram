package com.backend.instagram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.service.StoryService;


@RestController
@RequestMapping("/story")
@CrossOrigin(origins = {"http://localhost:52774","http://10.0.0.42:4200"})
public class StoryController {

	@Autowired
	private StoryService storyService;
	
	@PostMapping("/save/{userId}")
	public ResponseEntity<Object> saveStory(@PathVariable int userId, MultipartFile file){
		return storyService.saveStory(userId, file);
	}
	
	@GetMapping("/userstory/{storyId}")
	public ResponseEntity<Object> getUserStory(@PathVariable int storyId){
		return storyService.getUserStory(storyId);
	}
	
	@GetMapping("/allstories")
	public ResponseEntity<Object> getAllStories(){
		return storyService.getAllStories();
	}
	
	
}

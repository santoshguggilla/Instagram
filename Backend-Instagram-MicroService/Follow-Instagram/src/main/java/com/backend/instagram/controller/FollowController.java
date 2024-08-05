package com.backend.instagram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.instagram.service.FollowService;

@RestController
@RequestMapping("/follow")
@CrossOrigin(origins={"http://localhost:4200"})
public class FollowController {

	@Autowired
	private FollowService  followService;
	
	@PostMapping("/followuser/{userId}")
	public ResponseEntity<Object> userFollows(@PathVariable int userId,@RequestParam("followeeId") int followeeId){
		return followService.userFollows(userId,followeeId);
	}
	
	@PostMapping("/unfollowuser/{userId}")
	public ResponseEntity<Object> unfollowUser(@PathVariable int userId, @RequestParam("followeeId") int followeeId){
		return followService.userUnFollow(userId,followeeId);
	}
	
	@GetMapping("/followers/{userId}")
	public ResponseEntity<Object> followers(@PathVariable int userId){
		return followService.userFollowers(userId);
	}
	
	@GetMapping("/followees/{userId}")
	public ResponseEntity<Object> followees(@PathVariable int userId){
		return followService.userFollowees(userId);
	}
	
	
}

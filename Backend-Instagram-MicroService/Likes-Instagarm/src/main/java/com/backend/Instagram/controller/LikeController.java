package com.backend.Instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Instagram.model.Like;
import com.backend.Instagram.service.LikeService;


@RestController
@RequestMapping("/like")
public class LikeController {

	@Autowired
	private LikeService likeService;
	
	@GetMapping("/likepost/{userid}")
	public ResponseEntity<Like> addLikeToPost(@PathVariable int userid, @RequestParam("postid") int postid){
		return likeService.addLikeToPost(userid,postid);
	}
	
	@GetMapping("/unlikepost/{userid}")
	public ResponseEntity<String> unLikePost(@PathVariable int userid, @RequestParam("postid") int postid){
		return likeService.unLikePost(userid,postid);
	}
	
	@GetMapping("/likes/{postid}")
	public ResponseEntity<Like> getLikesForPost(@PathVariable int postid){
		return likeService.getLikesForPost(postid);
	}
	@GetMapping("/getusersliked/{postid}")
	public ResponseEntity<List<Integer>> getUserIdsLikedForPost(@PathVariable int postid){
		return likeService.getUserIdsLikedForPost(postid);
	}
	
	@GetMapping("/getpostidlikeduser/{userid}")
	public ResponseEntity<List<Integer>> getPostIdsLikedUser(@PathVariable int userid){
		return likeService.getPostIdsLikedUser(userid);
	}
}

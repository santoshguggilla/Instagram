package com.backend.Instagram.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.backend.Instagram.model.Like;

public interface LikeService {

	ResponseEntity<Like> addLikeToPost(int userid, int postid);

	ResponseEntity<String> unLikePost(int userid, int postid);

	ResponseEntity<Like> getLikesForPost(int postid);

	ResponseEntity<List<Integer>> getUserIdsLikedForPost(int postid);

	ResponseEntity<List<Integer>> getPostIdsLikedUser(int userid);

	
}

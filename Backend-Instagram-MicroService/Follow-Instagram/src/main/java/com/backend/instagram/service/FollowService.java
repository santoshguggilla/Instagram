package com.backend.instagram.service;

import org.springframework.http.ResponseEntity;

public interface FollowService {

	ResponseEntity<Object> userFollows(int followingId, int followeeId);

	ResponseEntity<Object> userUnFollow(int followingId, int followeeId);

	ResponseEntity<Object> userFollowers(int id);

	ResponseEntity<Object> userFollowees(int id);

	
}

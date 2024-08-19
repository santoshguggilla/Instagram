package com.backend.instagram.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backend.instagram.model.Follow;
import com.backend.instagram.repository.FollowRepository;

@Service
public class FollowServiceImpl implements FollowService{

	@Autowired
	private FollowRepository followRespository;
	
	@Override
	public ResponseEntity<Object> userFollows(int followingId, int followeeId) {
		Follow follow=followRespository.findByFollowerIdAndFolloweeId(followingId,followeeId);
		if(follow!=null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(follow);
		}
		Follow newFollow=new Follow();
		newFollow.setFolloweeId( followeeId);
		newFollow.setFollowerId(followingId);
		Follow followed=followRespository.save(newFollow);
		return ResponseEntity.status(HttpStatus.CREATED).body(followed);
	}

	@Override
	public ResponseEntity<Object> userUnFollow(int followingId, int followeeId) {
		Follow follow=followRespository.findByFollowerIdAndFolloweeId(followingId,followeeId);
		if(follow!=null) {
			followRespository.deleteById(follow.getId());
			return ResponseEntity.status(HttpStatus.CREATED).body(follow);
		}else{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT_FOUND");
		}
		
	}

	@Override
	public ResponseEntity<Object> userFollowers(int id) {
		Set<Follow> followers=followRespository.findByFollowerId(id);
		return ResponseEntity.status(HttpStatus.OK).body(followers);
	}

	@Override
	public ResponseEntity<Object> userFollowees(int id) {
		Set<Follow> followees=followRespository.findByFolloweeId(id);
		return ResponseEntity.status(HttpStatus.OK).body(followees);
	}

	@Override
	public ResponseEntity<Object> getFollowList() {
		
		List<Follow> followList = followRespository.findAll();
		Set<Integer> followUserIds = followList.stream()
		    .map(Follow::getFolloweeId)  // Extract the followeeId
		    .collect(Collectors.toSet());  // Collect into a Set to remove duplicates
		return ResponseEntity.status(HttpStatus.OK).body(followUserIds);
	}

	
}

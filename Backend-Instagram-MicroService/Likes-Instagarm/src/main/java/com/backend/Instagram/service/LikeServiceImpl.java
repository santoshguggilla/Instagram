package com.backend.Instagram.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backend.Instagram.model.Like;
import com.backend.Instagram.repository.LikeRepository;

@Service
public class LikeServiceImpl implements LikeService {
    
    @Autowired
    private LikeRepository likeRepository;

    @Override
    public ResponseEntity<Like> addLikeToPost(int userid, int postid) {
        Like like = new Like();
        like.setPostId(postid);
        like.setUserId(userid);
        like.setUpdatedAt(LocalDateTime.now());
        Like savedLike = likeRepository.save(like);
        return ResponseEntity.ok(savedLike);
    }

    @Override
    public ResponseEntity<String> unLikePost(int userid, int postid) {
        Like like = likeRepository.findByUserIdAndPostId(userid, postid);
        if (like != null) {
            likeRepository.delete(like);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Like not found");
        }
    }

    @Override
    public ResponseEntity<Like> getLikesForPost(int postid) {
        Like likes = likeRepository.findByPostId(postid);
        return ResponseEntity.ok(likes);
    }

    @Override
    public ResponseEntity<List<Integer>> getUserIdsLikedForPost(int postid) {
        List<Integer> userIds = likeRepository.findUserIdsByPostId(postid);
        return ResponseEntity.ok(userIds);
    }

    @Override
    public ResponseEntity<List<Integer>> getPostIdsLikedUser(int userid) {
        List<Integer> postIds = likeRepository.findPostIdsByUserId(userid);
        return ResponseEntity.ok(postIds);
    }
}

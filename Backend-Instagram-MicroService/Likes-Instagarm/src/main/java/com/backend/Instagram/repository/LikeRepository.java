package com.backend.Instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.Instagram.model.Like;

public interface LikeRepository  extends JpaRepository<Like, Integer>{

	Like findByUserIdAndPostId(int userid, int postid);

	Like findByPostId(int postid);
	
	@Query("SELECT l.userId FROM Like l WHERE l.postId = :postId")
	List<Integer> findUserIdsByPostId(int postId);
	
	@Query("SELECT l.postId FROM Like l WHERE l.userId = :userId")
	List<Integer> findPostIdsByUserId(int userId);

	
}

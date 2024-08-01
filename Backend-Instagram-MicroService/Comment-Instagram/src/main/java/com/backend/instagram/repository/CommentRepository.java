package com.backend.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.instagram.model.Comment;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

	List<Comment> findByPostId(int postId);

}

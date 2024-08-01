package com.backend.instagram.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.instagram.model.Comment;
import com.backend.instagram.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public Comment addComment(Comment comment) {
		comment.setCreatedAt(LocalDateTime.now());
		return commentRepository.save(comment);
	}

	@Override
	public List<Comment> getCommentsByPostId(int postId) {
		return commentRepository.findByPostId(postId);
	}

	@Override
	public void deleteComment(int commentId) {
		commentRepository.deleteById(commentId);
	}

}

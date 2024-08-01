package com.backend.instagram.service;

import java.util.List;

import com.backend.instagram.model.Comment;

public interface CommentService {

	public Comment addComment(Comment comment);	
	public List<Comment> getCommentsByPostId(int postId);	
	public void deleteComment(int commentId);
}

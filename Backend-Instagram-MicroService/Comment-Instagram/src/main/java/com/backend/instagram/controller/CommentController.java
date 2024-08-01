package com.backend.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.instagram.model.Comment;
import com.backend.instagram.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	@PostMapping("/addComment")
	public Comment addComment(@RequestBody Comment comment) {
		return commentService.addComment(comment);
	}
	
	@GetMapping("/getComments/{postId}")
	public List<Comment> getCommensByPostId(@PathVariable int postId){
		return commentService.getCommentsByPostId(postId);
	}
	
	@DeleteMapping("/deleteComment/{commentId}")
	public void deleteComment(@PathVariable int commentId) {
		commentService.deleteComment(commentId);
	}
}

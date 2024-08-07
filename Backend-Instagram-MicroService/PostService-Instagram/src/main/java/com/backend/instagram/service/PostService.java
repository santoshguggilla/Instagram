package com.backend.instagram.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.Post;

public interface PostService {

	ResponseEntity<Object> getPostsByUserId(int userId) ;

	List<Post> findAll();

	ResponseEntity<Object> createPost(int id, MultipartFile file,String description,Post post);

	ResponseEntity<Object> deletePost(int postid);

	ResponseEntity<Object> viewPost(int postid);
	    

}

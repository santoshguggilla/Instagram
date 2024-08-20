  package com.backend.instagram.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.Post;
import com.backend.instagram.service.PostService;

@RestController
@RequestMapping("/posts")  
@CrossOrigin(origins={"http://10.0.0.36:7894", "http:// 10.0.0.36:4200"})   
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getPostsByUserId(@PathVariable int userId) {
        return postService.getPostsByUserId(userId);
    }
    
    @GetMapping("/posts")
    public List<Post> getAllPosts(){
    	return postService.findAll();
    }
    
    @PostMapping("/createpost/{id}")
    public ResponseEntity<Object> createPost(@PathVariable("id") int id,@RequestParam("file") MultipartFile file, @RequestParam("descrption") String description){
    	Post post=new Post();
    	post.setCreatedAt(LocalDateTime.now());
    	return postService.createPost(id,file,description,post);
    }
    
    @DeleteMapping("/deletepost/{postid}")
    public ResponseEntity<Object> deletePost(@PathVariable("postid") int postid) {
    	return (ResponseEntity<Object>) postService.deletePost(postid);
    }
    
    @GetMapping("/viewpost/{postid}")
    public ResponseEntity<Object> viewPost(@PathVariable("postid") int postid){
    	return postService.viewPost(postid);
    }
   
}


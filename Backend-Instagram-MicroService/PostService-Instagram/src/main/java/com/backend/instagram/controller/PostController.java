  package com.backend.instagram.controller;

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
@CrossOrigin(origins={"http://localhost:4200", "http://localhost:52190","http://**"})   
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
    public ResponseEntity<Object> createPost(@PathVariable("id") int id,@RequestParam("file") MultipartFile file){
    	Post post=new Post();
    	return postService.createPost(id,file,post);
    }
    
    @DeleteMapping("/deletepost/{postid}")
    public void deletePost(@PathVariable("postid") int postid) {
    	postService.deletePost(postid);
    }
   
}


package com.backend.instagram.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.Post;
import com.backend.instagram.repository.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class PostServiceImpl implements PostService{

	
	    @Autowired
	    private PostRepository postRepository;

	    public ResponseEntity<Object> getPostsByUserId(int userId) {
	    	List<Post> postsById=  postRepository.findByUserId(userId);
	    	return ResponseEntity.status(HttpStatus.OK).body(postsById);
	    }

	    @Override
	    public List<Post> findAll() {
	        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
	    }
		@Override
		public ResponseEntity<Object> createPost(int id, MultipartFile file, String description,Post post) {
		    try {
		        // Get the file extension
		        String fileName = file.getOriginalFilename();
		        String extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

		        // Convert file to Base64
		        String base64String = "";
		        try (InputStream inputStream = file.getInputStream();
		             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
		            IOUtils.copy(inputStream, baos);
		            byte[] bytes = baos.toByteArray();
		            base64String = Base64.getEncoder().encodeToString(bytes);
		        }

		        // Save Base64 string and other post details
		        if (extension.equals(".jpg") || extension.equals(".png") || extension.equals(".jpeg")) {
		            post.setImageUrl(base64String);
		        } else if (extension.equals(".mp4") || extension.equals(".avi") || extension.equals(".mov")) {
		            post.setVideoUrl(base64String);
		        } else {
		            throw new IllegalArgumentException("Unsupported file type");
		        }

		        // Set the userId in the post and save it to the repository
		        post.setUserId(id);
		        post.setContent(description);
		        postRepository.save(post);

		        Map<String, String> response = new HashMap<>();
		        response.put("message", "File uploaded and saved successfully");
		        return ResponseEntity.status(HttpStatus.OK).body(response);
		    } catch (Exception e) {
		        Map<String, String> errorResponse = new HashMap<>();
		        errorResponse.put("message", "Failed to upload and save file: " + e.getMessage());
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		    }
		}

		@Transactional
		@Override
		public ResponseEntity<Object> deletePost(int postid) {
			Post post=this.postRepository.findById(postid);
			if(post!=null)
			{
				this.postRepository.deleteById(post.getId());
				return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
			}
			else
			{
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Deleted ");
			}
			
		}

		@Override
		public ResponseEntity<Object> viewPost(int postid) {	
			return ResponseEntity.status(HttpStatus.OK).body(postRepository.findById(postid));
		}


}

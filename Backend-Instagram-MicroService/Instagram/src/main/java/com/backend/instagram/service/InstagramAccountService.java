package com.backend.instagram.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.InstagramAccount;


public interface InstagramAccountService {

	ResponseEntity<Object> signUpAccount(InstagramAccount instagramAccount);

	boolean isExists(String email);

	ResponseEntity<Object> accountLogin(InstagramAccount instagramAccount);

	ResponseEntity<Object> forgotPassword(String email);
	
	ResponseEntity<Object> validateResetToken(String token);

	ResponseEntity<Object> resetPassword(String token, String password);

	InstagramAccount findByEmail(String instagramFolloweeEmail);

	InstagramAccount findById(int userId);

	InstagramAccount	getAccountById(int id);

	ResponseEntity<Object> uploadImage(int id, MultipartFile imageUrl);

	ResponseEntity<Object> getUserList();

	ResponseEntity<Object> getUsersByPosts(List<Integer> userids);


}

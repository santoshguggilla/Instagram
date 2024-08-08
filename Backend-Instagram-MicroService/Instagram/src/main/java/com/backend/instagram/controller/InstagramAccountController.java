package com.backend.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.InstagramAccount;
import com.backend.instagram.service.InstagramAccountService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://10.0.0.69:7894", "http:// 10.0.0.5:4200" })
public class InstagramAccountController {

	@Autowired
	private InstagramAccountService instagramAccountService;

	@PostMapping("/signup")
	public ResponseEntity<Object> signUpAccount(@RequestBody InstagramAccount instagramAccount) {
		return instagramAccountService.signUpAccount(instagramAccount);
	}

	@PostMapping("/login")
	public ResponseEntity<Object> accountLogin(@RequestBody InstagramAccount instagramAccount) {
		return instagramAccountService.accountLogin(instagramAccount);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<Object> forgotPassword(@RequestParam("email") String email) {
		return instagramAccountService.forgotPassword(email);
	}

	@PostMapping("/validate-reset-token")
	public ResponseEntity<Object> validateResetToken(@RequestParam("token") String token) {
		return instagramAccountService.validateResetToken(token);
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Object> resetPassword(@RequestParam("token") String token,
			@RequestParam("newPassword") String password) {
		return instagramAccountService.resetPassword(token, password);
	}

	@GetMapping("/profile/{id}")
	public InstagramAccount viewProfile(@PathVariable("id") int id) {
		return instagramAccountService.getAccountById(id);
	}

	@PostMapping("/uploadprofile/{id}")
	public ResponseEntity<Object> uploadImage(@PathVariable("id") int id,
			@RequestParam("file") MultipartFile imageUrl) {
		return instagramAccountService.uploadImage(id, imageUrl);
	}

	@GetMapping("/getUserList")
	public ResponseEntity<Object> getUserList() {
		return instagramAccountService.getUserList();
	}
	
	@GetMapping("/getusers")
	public ResponseEntity<Object> getUsersByPosts(@RequestParam List<Integer> userids ){
		return instagramAccountService.getUsersByPosts(userids);
	}
}

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

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://10.0.0.5:61023" })
@Slf4j
public class InstagramAccountController {

	@Autowired
	private InstagramAccountService instagramAccountService;

	@PostMapping("/signup")
	public ResponseEntity<Object> signUpAccount(@RequestBody InstagramAccount instagramAccount) {
		log.info("this is instagram controller method signUpAccount() instagramAccount " + instagramAccount.toString());
		return instagramAccountService.signUpAccount(instagramAccount);
	}

	@PostMapping("/login")
	public ResponseEntity<Object> accountLogin(@RequestBody InstagramAccount instagramAccount) {
		log.info("this is instagram controller method accountLogin() instagramAccount " + instagramAccount.toString());
		return instagramAccountService.accountLogin(instagramAccount);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<Object> forgotPassword(@RequestParam("email") String email) {
		log.info("this is instagram controller method forgotPassword() email " + email);
		return instagramAccountService.forgotPassword(email);
	}

	@PostMapping("/validate-reset-token")
	public ResponseEntity<Object> validateResetToken(@RequestParam("token") String token) {
		log.info("this is instagram controller method validateResetToken() token " + token);
		return instagramAccountService.validateResetToken(token);
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Object> resetPassword(@RequestParam("token") String token,
			@RequestParam("newPassword") String password) {
		log.info("this is instagram controller method resetPassword() token " + token);
		return instagramAccountService.resetPassword(token, password);
	}

	@GetMapping("/profile/{id}")
	public InstagramAccount viewProfile(@PathVariable("id") int id) {
		log.info("this is instagram controller method viewProfile() id " + id);
		return instagramAccountService.getAccountById(id);
	}

	@PostMapping("/uploadprofile/{id}")
	public ResponseEntity<Object> uploadImage(@PathVariable("id") int id,
			@RequestParam("file") MultipartFile imageUrl) {
		log.info("this is instagram controller method uploadImage() id " + id);
		return instagramAccountService.uploadImage(id, imageUrl);
	}

	@GetMapping("/getUserList")
	public ResponseEntity<Object> getUserList() {
		log.info("this is instagram controller method getUserList()");
		return instagramAccountService.getUserList();
	}
	
	@GetMapping("/getusers")
	public ResponseEntity<Object> getUsersByPosts(@RequestParam List<Integer> userids ){
		log.info("this is instagram controller method getUsersByPosts() userid" + userids);
		return instagramAccountService.getUsersByPosts(userids);
	}
	
	@GetMapping("/unFollowUsers")
	public ResponseEntity<Object> unFollowUsers(@RequestParam List<Integer> userids ){
		log.info("this is instagram controller method unFollowUsers() userid" + userids);
		return instagramAccountService.unFollowUsers(userids);
	}
	@GetMapping("/followUsers")
	public ResponseEntity<Object> followUsers(@RequestParam List<Integer> userids ){
		log.info("this is instagram controller method followUsers() userid" + userids);	
		return instagramAccountService.followUsers(userids);
	} 
}

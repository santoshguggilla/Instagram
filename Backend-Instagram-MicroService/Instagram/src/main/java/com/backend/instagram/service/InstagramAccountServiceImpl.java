package com.backend.instagram.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.backend.instagram.model.InstagramAccount;
import com.backend.instagram.repository.InstagramAccountRepository;
@Service
public class InstagramAccountServiceImpl implements InstagramAccountService {
	
	@Autowired
	private InstagramAccountRepository instagramAccountRepository;
	

	@Autowired
	private EmailService emailService;

	@Override
	public ResponseEntity<Object> signUpAccount(@RequestBody InstagramAccount instagramAccount) {
		
		try {
			if(!isExists(instagramAccount.getEmail())) {
				instagramAccount.setCreated(LocalDateTime.now());
				instagramAccount.setUpdated(LocalDateTime.now());
				InstagramAccount savedInstagramAccount = instagramAccountRepository.save(instagramAccount);
				return ResponseEntity.status(HttpStatus.CREATED).body(savedInstagramAccount);
			}else {
				return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("ALREADY_REPORTED");
			}
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating the account: " + e.getMessage());
	    }
	}

	@Override
	public boolean isExists(String email) {	
		return instagramAccountRepository.isEmailExists(email);
	}

	@Override
	public ResponseEntity<Object> accountLogin(InstagramAccount instagramAccount) {
		if(isExists(instagramAccount.getEmail())) {
			InstagramAccount savedInstagramAccount=instagramAccountRepository.findByEmail(instagramAccount.getEmail());
			if(savedInstagramAccount.getPassword().equals(instagramAccount.getPassword())) {
				return ResponseEntity.status(HttpStatus.OK).body(savedInstagramAccount);
			}else {
				return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("INCORRECT");
			}
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT_FOUND");
		}
	}

	@Override
	public ResponseEntity<Object> forgotPassword(String email) {
		
			
			InstagramAccount account = instagramAccountRepository.findByEmail(email);
			
			instagramAccountRepository.findAll();
			
	        if (account == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NOT_FOUND");
	        }

	        // Generate a reset token
	        String token = UUID.randomUUID().toString();
	        account.setResetToken(token);
	        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(10);
	        account.setResetTokenExpiration(expirationTime);
	        instagramAccountRepository.save(account);

	        // Create reset password link
	        String resetLink = "http://localhost:4200/reset-password?token=" + token;

	        // Send the email
	        emailService.sendSimpleMessage(email, "Reset Password", "To reset your password, click the link below:\n" + resetLink);

	        return ResponseEntity.ok("MAIL_SENT");
		
	}
	
	public ResponseEntity<Object> validateResetToken(String token) {
        InstagramAccount account = instagramAccountRepository.findByResetToken(token);
        if (account == null || account.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }
        return ResponseEntity.ok().body("Valid token");
    }

	@Override
	public ResponseEntity<Object> resetPassword(String token, String password) {
		InstagramAccount account=instagramAccountRepository.findByResetToken(token);
		account.setPassword(password);
		instagramAccountRepository.save(account);
		return ResponseEntity.ok("RESETED");
	}

	@Override
	public InstagramAccount findByEmail(String instagramFolloweeEmail) {
		
		return instagramAccountRepository.findByEmail(instagramFolloweeEmail);
	}

	@Override
	public InstagramAccount findById(int userId) {
		return instagramAccountRepository.findById(userId).orElseThrow();
	}

	@Override
	public InstagramAccount getAccountById(int id) {
		if(id>0) {
			InstagramAccount instagramAccount=instagramAccountRepository.findById(id).get();
			if(instagramAccount!=null) {
				return instagramAccount;
			}
		}
		 return null;
	}

	@Override
	public ResponseEntity<Object> uploadImage(int id, MultipartFile file) {
		InstagramAccount instagramAccount=getAccountById(id);
		
		if(instagramAccount==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
		}
		if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }
        try {
        	
	        // Convert file to Base64
	        String base64String = "";
	        try (InputStream inputStream = file.getInputStream();
	             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
	            IOUtils.copy(inputStream, baos);
	            byte[] bytes = baos.toByteArray();
	            base64String = Base64.getEncoder().encodeToString(bytes);
	        }
            instagramAccount.setImage(base64String);
            InstagramAccount savedInstagramAccount=instagramAccountRepository.save(instagramAccount);
            Map<String, Object> response = new HashMap<>();
	        response.put("data", savedInstagramAccount);
	        return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(Exception e){
        	 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
	}

	@Override
	public ResponseEntity<Object> getUserList() {
		return ResponseEntity.ok(instagramAccountRepository.findAll());
	}

	

}

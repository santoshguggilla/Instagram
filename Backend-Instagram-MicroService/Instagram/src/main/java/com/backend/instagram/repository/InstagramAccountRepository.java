package com.backend.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.instagram.model.InstagramAccount;

public interface InstagramAccountRepository extends JpaRepository<InstagramAccount, Integer> {

	  @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM InstagramAccount a WHERE a.email = :email")
	    boolean isEmailExists(@Param("email") String email);

	@Query("select al from InstagramAccount as al where al.email =:email")
	InstagramAccount findByEmail(String email);

	InstagramAccount findByResetToken(String token);
	
	@Query("select al from InstagramAccount as al where al.id in (?1)")
	List<InstagramAccount> findByUserIdList(List<Integer> userids);

}

package com.backend.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.instagram.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(int userId);


//    @Modifying
//    @Query("DELETE FROM Post al WHERE al.id = :postid")
//    void deleteById(@Param("postid") int postid);

	Post findById(int postid);


	void deleteById(int id);
}


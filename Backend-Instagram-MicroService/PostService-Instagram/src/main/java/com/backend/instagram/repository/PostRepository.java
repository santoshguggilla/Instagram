package com.backend.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.instagram.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(int userId);
}


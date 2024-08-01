package com.backend.instagram.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.instagram.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{

	List<Message> findBySenderIdAndReceiverId(int senderId, int receiverId);

}

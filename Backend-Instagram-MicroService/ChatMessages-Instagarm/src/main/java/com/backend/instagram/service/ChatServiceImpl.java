package com.backend.instagram.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.instagram.model.Message;
import com.backend.instagram.repository.MessageRepository;

@Service
public class ChatServiceImpl implements ChatService{
	
	@Autowired
    private MessageRepository messageRepository;

	@Override
	public Message saveMessage(Message message) {
		 message.setTimestamp(LocalDateTime.now());
	     return messageRepository.save(message);
	}

	@Override
	public List<Message> getMessages(int senderId, int receiverId) {
		 return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
	}

}

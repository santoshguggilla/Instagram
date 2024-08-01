package com.backend.instagram.service;

import java.util.List;

import com.backend.instagram.model.Message;

public interface ChatService {

	public Message saveMessage(Message message);

	public List<Message> getMessages(int senderId, int receiverId);
}

package com.backend.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.backend.instagram.model.Message;
import com.backend.instagram.service.ChatService;

@Controller
@CrossOrigin(origins = {"http://localhost:52774","http://10.0.0.42:4200","http://localhost:49765"})
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        chatService.saveMessage(message);
        return message;
    }
    
    @GetMapping("/messages")
    @ResponseBody
    public ResponseEntity<List<Message>> getMessages(@RequestParam int userId1, @RequestParam int userId2) {
        List<Message> messages = chatService.getMessages(userId1, userId2);
        return ResponseEntity.ok(messages);
    }
}

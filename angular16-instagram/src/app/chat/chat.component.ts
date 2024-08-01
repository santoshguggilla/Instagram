import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  content !: string;
  senderId: number = 1;  // Example sender ID
  receiverId: number = 2;  // Example receiver ID

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.content) {
      this.chatService.sendMessage(this.senderId, this.receiverId, this.content);
      this.content = '';
    }
  }
}

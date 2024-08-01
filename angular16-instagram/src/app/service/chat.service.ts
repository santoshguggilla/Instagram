import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<string>();
  private baseUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/messages', (message) => {
        this.messageSubject.next(message.body);
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket error: ' + error);
    };

    this.stompClient.activate();
  }

  sendMessage(senderId: number, receiverId: number, content: string) {
    this.stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify({ senderId, receiverId, content }),
    });
  }

  getMessages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  fetchChatHistory(userId1: number, userId2: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/messages`, {
      params: { userId1: userId1.toString(), userId2: userId2.toString() }
    });
  }
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoveryService } from './discovery.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl: string="http://10.0.0.42:8082/posts";

  constructor(private http: HttpClient) {
    
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/user/${userId}`);
  }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.postUrl}/posts`);
  }

  createPost(userId: string, file: File): Observable<Post> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Post>(`${this.postUrl}/createpost/${userId}`, formData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoveryService } from './discovery.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private postUrl: string="http://10.0.0.5:8082/posts";
  
  constructor(private http: HttpClient) {
    
  }
  
  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/user/${userId}`);
  }
  
  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.postUrl}/posts`);
  }
  getMorePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/posts/more`);
  }

  getPreviousPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/posts/previous`);
  }
  
 
  createPost(userId: string, file: File, caption: string): Observable<Post> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('descrption', caption); // Add caption to form data

    return this.http.post<Post>(`${this.postUrl}/createpost/${userId}`, formData);
  }
  
  getPostsById(postid: string): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/viewpost/${postid}`);
  }
  deletePostById(postid: any) :Observable<any>{
   return this.http.delete(`${this.postUrl}/deletepost/${postid}`)
  }
}

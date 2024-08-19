import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  
  
  
  private followUrl: string="http://10.0.0.5:8083/follow";
  
  constructor( private http:HttpClient){}
  
  getFollowersByUserId(userId: string):Observable<any> {
    return this.http.get<any>(`${this.followUrl}/followers/${userId}`,{});
  }
  
  getFolloweesByUserId(userId: string) :Observable<any>{
    return this.http.get<any>(`${this.followUrl}/followees/${userId}`,{});
  }
  
  followUser(userId:any, followeeId:any): Observable<any>{
    
    return this.http.post<any>(`${this.followUrl}/followuser/${userId}?followeeId=${followeeId}`, {})
  }
  unfollowUser(userId: any, followeeId: any) : Observable<any> {
    return this.http.post<any>(`${this.followUrl}/unfollowuser/${userId}?followeeId=${followeeId}`, {})
  }
  
}

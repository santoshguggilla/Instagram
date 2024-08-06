import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoveryService } from '../service/discovery.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  
  userUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) {
   
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/users/${username}`);
  }

  saveUser(user: User): Observable<User> {
   
    return this.http.post<User>(`${this.userUrl}/signup`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/profile/${id}`);
  }


  uploadProfilePhoto(id: number, selectedFile: File) : Observable<User> {
    const formData: FormData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post<User>(`${this.userUrl}/uploadprofile/${id}`,formData);
  }
  /*
  saveUser(user: User): Observable<User> {
    return this.discoveryService.getServiceUrl('user-service').pipe(
      mergeMap(url => this.http.post<User>(`${url}/api/signup`, user))
    );
  }
    */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/getUserList`);
  }

  getAllUsersByPosts(userids: number[]): Observable<User[]> {
    const params = new HttpParams().set('userids', userids.join(','));
    return this.http.get<User[]>(`${this.userUrl}/getusers`, { params });
  }
  
}

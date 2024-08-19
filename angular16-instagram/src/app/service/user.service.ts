import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoveryService } from '../service/discovery.service';
import { Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { Follow } from '../models/follow.model';
import { FollowService } from './follow.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  
  
  userUrl: string = "http://10.0.0.5:8080/api";

  userFollowList:Follow[] =[];
  
  constructor(private http: HttpClient, private followService:FollowService) {
    
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
      
      getUnFollowedUsers(userId: any): Observable<User[]> {
        return this.followService.getFollowersByUserId(userId).pipe(
            switchMap((userFollowList: { id: number; followerId: number; followeeId: number }[]) => {  // Define the correct type
                console.log(userFollowList);
                
                // Extract the follower IDs
                const userIds = userFollowList.map(follow => follow.followeeId);  // Use the correct property name
                console.log(userIds);
    
                // Create the HttpParams object to send the IDs as query parameters
                const params = new HttpParams().set('userids', userIds.join(','));
    
                // Now, perform the HTTP request to get the users by follow
                return this.http.get<User[]>(`${this.userUrl}/unFollowUsers`, { params });
            })
        );
    }
    getFollowedUsers(userId: any) :Observable<User[]> {
      return this.followService.getFollowersByUserId(userId).pipe(   
        switchMap((userFollowList: { id: number; followerId: number; followeeId: number }[]) => {  // Define the correct type
            console.log(userFollowList);
            
            // Extract the follower IDs
            const userIds = userFollowList.map(follow => follow.followeeId);  // Use the correct property name
            console.log(userIds);

            // Create the HttpParams object to send the IDs as query parameters
            const params = new HttpParams().set('userids', userIds.join(','));

            // Now, perform the HTTP request to get the users by follow
            return this.http.get<User[]>(`${this.userUrl}/followUsers`, { params });
        })
    );
    }
    

      /*
 getUnFollowedUsers(userid:any): Observable<User[]> {
        this.followService.getFollowersByUserId(userid).subscribe(userids =>{
          this.userFollowList=userids; 
          console.log(userids);
          
        });

        const userIds = this.userFollowList.map(follow => follow.folowerId);
        console.log(userIds);
        
        const params = new HttpParams().set('userids', userIds.join(','));
        return this.http.get<User[]>(`${this.userUrl}/getuserbyfollow`,{params})

      }
      
      */

    }
    
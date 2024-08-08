import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { DiscoveryService } from './discovery.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl: string = 'http://10.0.0.5:8080/api';
  private user: User | null = null;

  constructor(private http: HttpClient, private discoveryService: DiscoveryService,private router:Router) {}

  sendResetPasswordEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, null, { params });
  }

  validateResetToken(token: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post(`${this.apiUrl}/validate-reset-token`, null, { params });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);
    return this.http.post(`${this.apiUrl}/reset-password`, null, { params });
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        console.log('Login Response:', response);
        if (response) {
          this.setUser(response); // Persist user data in localStorage
        }
      })
    );
  }

  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User set in localStorage:', this.user);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    console.log('User retrieved from localStorage:', user);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
      this.router.navigate(['']);
  }

  
}

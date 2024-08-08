import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit{
  
  images: string[] = [
    '../../assets/images/chat.png',
    '../../assets/images/ima.jpg',
    '../../assets/images/png.png',
    '../../assets/images/png1.png',
    '../../assets/images/google.png',
  ];
  currentIndex: number = 0;
  intervalId: any;

  user: User = {
    email: '',
    password: '',
  };
  constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router,
      private authService:AuthService,
    ) {}

  ngOnInit(): void {
    this.startImageRotation();

    // Check for the username query parameter and show the alert
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        alert(`Registration successful! Welcome to Instagram, ${username}`);
           // Remove the query parameter from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    });
  }
  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Change image every 3 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  

 
  

  onSubmit() {
    this.authService.login(this.user).subscribe(
      (response: any) => {
        if (response) {
          console.log('Login successful, navigating to home.');
          this.router.navigate(['/home']);
        } else {
          alert('Invalid login credentials');
        }
      },
      (error) => {
        if (error.error === 'INCORRECT') {
          alert('Invalid login credentials');
        } else {
          console.error(error);
          alert('An error occurred');
        }
      }
    );
  }

  navigateToSignUp() {
    this.router.navigateByUrl('signUp');
  }
}

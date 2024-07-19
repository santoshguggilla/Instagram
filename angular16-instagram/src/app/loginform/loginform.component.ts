import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  

  user :User= {
    email: '',
    password: '',
    
  };

  constructor(private http: HttpClient, private router: Router, private authService:AuthService) {}

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

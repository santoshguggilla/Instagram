import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if(!this.user){
      this.router.navigate(['']);
    }
    console.log('User in HomeComponent:', this.user);
  }

  navigateToProfile(){
    if (this.user) {
      this.router.navigate(['/profile', this.user.id]);
    }
  }
}

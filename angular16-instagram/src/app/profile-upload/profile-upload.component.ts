import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-upload',
  templateUrl: './profile-upload.component.html',
  styleUrls: ['./profile-upload.component.css']
})
export class ProfileUploadComponent implements OnInit {
  user: User | null = null;
  selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if(!this.user){
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.user && this.user.id && this.selectedFile) {
      this.userService.uploadProfilePhoto(this.user.id, this.selectedFile).pipe(
        tap(response => {
          console.log('Login Response:', response);
          if (response) {
            this.authService.login(response); // Persist user data in localStorage
          }
          this.dialog.closeAll();
        })
      ).subscribe(); // Missing subscribe() to initiate the observable
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

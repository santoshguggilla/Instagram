import { Component, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProfileUploadComponent } from '../profile-upload/profile-upload.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  user: User | null = null;
  @ViewChild(CreatePostModalComponent) createPostModal!: CreatePostModalComponent;
  constructor(private authService: AuthService, 
    private router: Router,
    public dialog: MatDialog,
    private userService:UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User in SidebarComponent:', this.user);
  }

  navigateToProfile(): void {
    if (this.user) {
      this.router.navigate(['/profile', this.user.id]);
    }else{
      alert("session expired please login")
      this.router.navigate(['']);
    }
  }

  openCreateModal(): void {
    this.dialog.open(CreatePostModalComponent, {

      width: '250px',
      data: { /* data to pass to the dialog, if any */ }
    });
  }

  navigateToHome() :void{
    if (this.user) {
      this.router.navigate(['/home']);
    }else{
      alert("session expired please login")
      this.router.navigate(['']);
    }
    
  }
  openDialog(): void {
    this.dialog.open(CreatePostModalComponent, {

      width: '550px',
      data: { /* data to pass to the dialog, if any */ }
    });
  }
  logout():void {
    this.authService.logout();
  }

  closeDialog():void{
    this.dialog.closeAll();
  }
  recommanded() {
    this.router.navigate(['recommandedList']);
  }
  onThemeChange(theme: string) {
    const profileHeader = document.querySelector('.profile-container h4') as HTMLElement;
    if (profileHeader) {
      profileHeader.style.color = theme === 'dark-theme' ? '#fff' : '#333'; // Update color based on theme
    }
  }
}

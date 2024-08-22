import { Component, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProfileUploadComponent } from '../profile-upload/profile-upload.component';
import { UserService } from '../service/user.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  user: User | null = null;
  @ViewChild(CreatePostModalComponent) createPostModal!: CreatePostModalComponent;
  @ViewChild('settingsDialog') settingsDialog!: TemplateRef<any>;
  constructor(
    private authService: AuthService, 
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User in SidebarComponent:', this.user);
  }

  // navigateToProfile(): void {
  //   if (this.user) {
  //     this.router.navigate(['/profile', this.user.id]);
  //   } else {
  //     alert("Session expired. Please login.");
  //     this.router.navigate(['']);
  //   }
  // }

  openCreateModal(): void {
    this.dialog.open(CreatePostModalComponent, {
      width: '550px',
      data: { /* data to pass to the dialog, if any */ }
    });
  }

  // navigateToHome(): void {
  //   if (this.user) {
  //     this.router.navigate(['/home']);
  //   } else {
  //     alert("Session expired. Please login.");
  //     this.router.navigate(['']);
  //   }
  // }

  openDialog(): void {
    this.dialog.open(CreatePostModalComponent, {
      width: '550px',
      data: { /* data to pass to the dialog, if any */ }
    });
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout(); // Log out if confirmed
      }
    });
  }

  closeDialog(): void {
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
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
  
  navigateToSearch(): void {
    this.router.navigate(['/search']);
  }
  
  navigateToReels(): void {
    this.router.navigate(['/reels']);
  }
  
  navigateToMessages(): void {
    this.router.navigate(['/messages']);
  }
  
  navigateToNotifications(): void {
    this.router.navigate(['/notifications']);
  }
  
  navigateToProfile(): void {
    if (this.user) {
      this.router.navigate(['/profile', this.user.id]);
    } else {
      alert("Session expired, please login");
      this.router.navigate(['']);
    }
  }
  openBottomDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { /* data to pass to the dialog, if any */ }
    });
  }
  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, {
      width: '250px',
      position: { bottom: '210px', left: '0px' },
      backdropClass: 'backdropBackground'
    });
  }
  toggleSettingsDialog(): void {
    const dialogRef = this.dialog.open(this.settingsDialog, {
      width: '250px',
      position: { bottom: '60px', left: '0px' }
    });
  }

}

import { Component } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent {
  selectedFile: File | null = null;
  user: User | null = null;
  post: Post | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null; // Add this line
  isInputProvided = false;  // Initially set to false
  showCaptionInput: boolean = false;
  caption: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    public dialog: MatDialog,
    
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    if (this.selectedFile) {
      const reader = new FileReader();
      this.isInputProvided = true;  // Set to true when a file is selected
      reader.onload = () => {
        if (reader.result) { // Ensure reader.result is not null
          // Check if the selected file is an image or video
          if (this.selectedFile!.type.startsWith('image/')) {
            this.imagePreview = reader.result as string; // Type assertion to string
            this.videoPreview = null; // Clear video preview
          } else if (this.selectedFile!.type.startsWith('video/')) {
            this.videoPreview = reader.result as string; // Type assertion to string
            this.imagePreview = null; // Clear image preview
          }
          this.showCaptionInput = true; // Show the caption input after file is selected
        }
      };
      
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  onNext() {
    this.showCaptionInput = true;
  }

  onPost(caption:string) {
    if (this.user && this.user.id && this.selectedFile) {
      
    } else {
      console.error('User or file is not selected');
    }
  }
  refreshPage() {
    window.location.reload();
  }
  closeDialog(): void {
    // this.dialog.closeAll();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'discard') {
        this.dialog.closeAll(); // Close the modal if 'discard' is selected
      }
      // Do nothing if 'cancel' is selected
    });
  
  }

  
}

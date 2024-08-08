import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../models/post.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {
  selectedFile: File | null = null;
  user: User | null = null;
  post: Post | null = null;
  imagePreview: string | ArrayBuffer | null = null;
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
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onNext() {
    this.showCaptionInput = true;
  }

  onPost(caption:string) {
    if (this.user && this.user.id && this.selectedFile) {
      this.postService.createPost(String(this.user.id), this.selectedFile,caption).subscribe(
        response => {
          this.post = response;
          console.log('Post created successfully', response);
          this.dialog.closeAll();
          this.refreshPage(); // Refresh the page 
          },
        error => {
          console.error('Error creating post', error);
        }
      );
    } else {
      console.error('User or file is not selected');
    }
  }
  refreshPage() {
    window.location.reload();
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
}

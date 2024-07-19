import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { CreatePostPreviewComponent } from '../create-post-preview/create-post-preview.component';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {
  selectedFile: File | null = null;
  user: User | null = null;
  post: Post | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.user && this.user.id && this.selectedFile) {
      this.postService.createPost(String(this.user.id), this.selectedFile).subscribe(
        response => {
          this.post = response;
          console.log('Post created successfully', response);
          this.dialog.closeAll();
          this.openPreviewDialog();
        },
        error => {
          console.error('Error creating post', error);
        }
      );
    } else {
      console.error('User or file is not selected');
    }
  }

  openPreviewDialog(): void {
    this.dialog.open(CreatePostPreviewComponent, {
      width: '600px',
      data: { file: this.selectedFile }
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

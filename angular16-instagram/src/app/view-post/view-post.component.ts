import { Component, Inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Post } from '../models/post.model';
import { PostService } from '../service/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  
  newComment: string = '';

  constructor(private postService:PostService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewPostComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.data.post.comments.push(this.newComment);
      this.newComment = '';
    }
  }

  deletePost(): void {
   
    this.postService.deletePostById(this.data.post.id).subscribe(str =>{
      console.log(str);
      
    },
    error => {
      console.error(error);
      
    }
    )
  
    console.log('Post deleted:', this.data.post);
    this.dialogRef.close(); // Optionally close the dialog after deletion
  }

}

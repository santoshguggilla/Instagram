import { Component, Inject, OnInit } from '@angular/core';
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
export class ViewPostComponent  implements OnInit{
  
  newComment: string = '';
  user:User|null=null;
  owner:boolean=false;
  constructor(private postService:PostService, private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewPostComponent>
  ) {}
  ngOnInit(): void {
   this.user= this.authService.getUser();
   if(!this.user || this.user.id == this.data.post.userId){
    this.owner=true;
   }
  }

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

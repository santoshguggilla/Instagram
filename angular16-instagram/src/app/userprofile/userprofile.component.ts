import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { FollowService } from '../service/follow.service';
import { AuthService } from '../service/auth.service';
import { ProfileUploadComponent } from '../profile-upload/profile-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  user: User | null = null;
  userId:string="";
  posts:number=0;
  followees:number=0;
  followers:number=0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService:PostService,
    private followService:FollowService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const loggedUser = this.authService.getUser();
    if (userId) {
      const parsedUserId = Number(userId);
      if (loggedUser && loggedUser.id === parsedUserId) {
        this.user = loggedUser;
      } else {
        this.userService.getUserById(userId).subscribe((user) => {
          this.user = user;
        });
      }
    } else {
      // Handle case where userId is null or undefined
      this.router.navigate(['']);
    }
    console.log(userId);
    if (userId) {
      this.postService.getPostsByUserId(userId).subscribe(posts =>{
        console.log(posts);
        console.log(posts.length);
        
        
        this.posts=posts.length
      })
      this.followService.getFollowersByUserId(userId).subscribe(follower =>{
        this.followers=follower.length

      })
      this.followService.getFolloweesByUserId(userId).subscribe(followee =>{
        this.followees=followee.length
      })

    }
    

    console.log("After asigning"+this.user);
    
  }
  uploadProfilePhoto():void{
    this.dialog.open(ProfileUploadComponent, {

      width: '550px',
      data: { /* data to pass to the dialog, if any */ }
    });
  }
}

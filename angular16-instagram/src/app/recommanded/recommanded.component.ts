import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FollowService } from '../service/follow.service';

@Component({
  selector: 'app-recommanded',
  templateUrl: './recommanded.component.html',
  styleUrls: ['./recommanded.component.css']
})
export class RecommandedComponent implements OnInit {

  userList: User[] = [];
  profile: User | null = null;
  unFollowed : boolean = true;
  followed : boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.profile = this.authService.getUser();
    if (!this.profile) {
      this.router.navigate(['']);
    }
    this.getUnFollowedUsers();
  }

  getUnFollowedUsers(): void {
    this.userService.getUnFollowedUsers(this.profile?.id).subscribe(data => {
      this.userList = data.map(user => ({ ...user, followed: false }));
    });
  }

  getFollowedUsers(): void {
    this.userService.getFollowedUsers(this.profile?.id).subscribe(data => {
      this.userList = data.map(user => ({ ...user, followed: true }));
    });
  }

  followUser(followee: User): void {
    if (!this.profile) {
      alert("User is not logged in");
      return;
    }
    const userId = this.profile.id;
    const followeeId = followee.id;
    this.followService.followUser(userId, followeeId).subscribe(response => {
      if (response) {
        alert("Followed successfully");
        followee.followed = true;
      } else {
        alert("Error occurred");
      }
    });
  }

  unfollowUser(followee: User): void {
    if (!this.profile) {
      alert("User is not logged in");
      return;
    }
    const userId = this.profile.id;
    const followeeId = followee.id;
    this.followService.unfollowUser(userId, followeeId).subscribe(response => {
      if (response) {
        alert("Unfollowed successfully");
        followee.followed = false;
      } else {
        alert("Error occurred");
      }
    });
  }

  removeUser(user: User): void {
    this.userList = this.userList.filter(u => u.id !== user.id);
  }

  unFollowedList(): void {
    this.unFollowed = true;
    this.followed = false;
    this.getUnFollowedUsers(); // Fetch unfollowed users when this tab is active
    console.log(this.userList);
  }

  followedList(): void {
    this.unFollowed = false;
    this.followed = true;
    this.getFollowedUsers(); // Fetch followed users when this tab is active
    console.log(this.userList);
    
  }
  navigateToProfile(userid:any): void {
      this.router.navigate(['/profile', userid]);
    
  }
}

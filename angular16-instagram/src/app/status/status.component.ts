import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FollowService } from '../service/follow.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  userList: User[] = [];
  user: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.userList = data.map(user => ({ ...user, followed: false }));
    });
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['']);
    }
  }
  pageSize = 5;
  currentIndex = 0;

  get visibleUsers() {
    return this.userList.slice(this.currentIndex, this.currentIndex + this.pageSize);
  }

  nextUser() {
    if (this.currentIndex + this.pageSize < this.userList.length) {
      this.currentIndex++;
    }
  }

  prevUser() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  navigateToUserStatus(userid:any){
    this.router.navigate(['userstatus',userid]);
  }
}

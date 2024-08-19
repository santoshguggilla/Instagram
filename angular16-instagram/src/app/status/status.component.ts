import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../service/follow.service';
import { AddStatusComponent } from '../add-status/add-status.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {

  userList: User[] = [];
  user: User | null = null;
  owner :boolean=false;
userId: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
     this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUsers().subscribe(data => {
      
      this.userList = data.map(user => ({ ...user, followed: false })).filter(user => user.id !== this.user?.id);;
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

  addStatus() {
    this.dialog.open(AddStatusComponent, {
      width: '250px',
      data: { user: this.user }
    });
  }
  openCreateModal(): void {
    
  }
}

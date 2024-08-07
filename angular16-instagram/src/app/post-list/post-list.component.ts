import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewPostComponent } from '../view-post/view-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  users:User[]=[];
  @Input() user: User | null = null;
  isProfilePage: boolean | undefined;
  currentIndex = 0;
  private routeSubscription!: Subscription;

  constructor(private postService: PostService, 
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe((url: UrlSegment[]) => {
      this.isProfilePage = url.some(segment => segment.path === 'profile');
      if (this.user && this.user.id && this.isProfilePage) {
        this.loadUserPosts(this.user.id.toString());
      } else {
        this.loadAllPosts();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadUserPosts(userId: string): void {
    this.postService.getPostsByUserId(userId).subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }

  loadAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      posts => {
        this.posts = posts;
        console.log(posts);
        this.getAllUsers();
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }
  getAllUsers(): void {
    const userIds = this.posts.map(post => post.userId);
    this.userService.getAllUsersByPosts(userIds).subscribe(
      users => {
        this.users = users;
        this.mapUsersToPosts();
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  mapUsersToPosts(): void {
    const userMap = new Map<number, User>();
    
    // Ensure user.id is defined before using it
    this.users.forEach(user => {
      if (user.id !== undefined) {
        userMap.set(user.id, user);
      }
    });
  
    this.posts.forEach(post => {
      post.user = userMap.get(post.userId);
    });
  }

  // Method to chunk the posts array into smaller arrays
  chunk(arr: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  get visiblePost(): Post | null {
    return this.posts[this.currentIndex] || null;
  }

  nextPost(): void {
    if (this.posts.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    }
  }

  previousPost(): void {
    if (this.posts.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    }
  }

  viewPost(post: Post): void {
    const dialogRef = this.dialog.open(ViewPostComponent, {
      width: 'auto',  // Let the width be determined by the content
      height: 'auto', // Let the height be determined by the content
      maxWidth: '90vw', // Ensure the dialog doesn’t exceed 90% of the viewport width
      maxHeight: '90vh', // Ensure the dialog doesn’t exceed 90% of the viewport height
      data: { post: post }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

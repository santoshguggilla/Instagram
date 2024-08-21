import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewPostComponent } from '../view-post/view-post.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionDialogComponent } from '../option-dialog/option-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  users: User[] = [];
  @Input() user: User | null = null;
  isProfilePage: boolean | undefined;
  currentIndex = 0;
  private routeSubscription!: Subscription;
  private isLoading = false;
  private isEndOfPosts = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
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

  // Load posts by user and sort by timestamp
  loadUserPosts(userId: string): void {
    this.postService.getPostsByUserId(userId).subscribe(posts => {
      this.posts = this.sortPostsByTimestamp(posts);
      this.isEndOfPosts = false;
      this.mapUsersToPosts();
    });
  }

  // Load all posts and sort by timestamp
  loadAllPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = this.sortPostsByTimestamp(posts);
      this.getAllUsers();
    });
  }

  // Sort posts by timestamp (recent first)
  sortPostsByTimestamp(posts: Post[]): Post[] {
    console.log('Sorting posts:', posts.map(post => post.timestamp)); // For debugging
    return posts.sort((a, b) => {
      const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return dateB - dateA; // Descending order: latest posts first
    });
  }
   

  showDetails(post: Post): void {
    post.showDetails = true;
  }

  hideDetails(post: Post): void {
    post.showDetails = false;
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // loadUserPosts(userId: string): void {
  //   this.postService.getPostsByUserId(userId).subscribe(posts => {
  //     this.posts = posts;
  //     this.isEndOfPosts = false;
  //     this.mapUsersToPosts();
  //   });
  // }

  // loadAllPosts(): void {
  //   this.postService.getAllPosts().subscribe(posts => {
  //     this.posts = posts;
  //     this.getAllUsers();
  //   });
  // }

  getAllUsers(): void {
    const userIds = this.posts.map(post => post.userId);
    this.userService.getAllUsersByPosts(userIds).subscribe(users => {
      this.users = users;
      this.mapUsersToPosts();
    });
  }

  mapUsersToPosts(): void {
    const userMap = new Map<number, User>();
    this.users.forEach(user => {
      if (user.id !== undefined) {
        userMap.set(user.id, user);
      }
    });

    this.posts.forEach(post => {
      post.user = userMap.get(post.userId);
      post.comments= 20;
      post.likes=55;
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
  
  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
    const top = target.scrollTop === 0;
    if (bottom && !this.isEndOfPosts && !this.isLoading) {
      this.loadMorePosts();
    }

    if (top && !this.isLoading) {
      this.loadPreviousPosts();
    }
  }

  loadMorePosts(): void {
    this.isLoading = true;
    this.postService.getMorePosts().subscribe(posts => {
      if (posts.length > 0) {
        this.posts = [...this.posts, ...posts];
      } else {
        this.isEndOfPosts = true;
      }
      this.isLoading = false;
    });
  }

  loadPreviousPosts(): void {
    this.isLoading = true;
    this.postService.getPreviousPosts().subscribe(posts => {
      if (posts.length > 0) {
        this.posts = [...posts, ...this.posts];
      }
      this.isLoading = false;
    });
  }

  viewPost(post: Post): void {
    const dialogRef = this.dialog.open(ViewPostComponent, {
      width: 'auto',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { post: post }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
   // Play video on hover
   playVideo(event: Event): void {
    const video = (event.target as HTMLVideoElement);
    video.play();
  }

  // Pause video on mouse leave
  pauseVideo(event: Event): void {
    const video = (event.target as HTMLVideoElement);
    video.pause();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OptionDialogComponent, {
      width: '360px'
      
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      // Handle dialog result here
    });
  }
}

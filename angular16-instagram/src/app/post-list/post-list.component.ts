import { Component, HostListener, Input } from '@angular/core';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts: Post[] = [];
  @Input() user: User | null = null;
  isProfilePage: boolean | undefined;
  currentIndex = 0;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.user && this.user.id) {
      this.route.url.subscribe(url => {
        this.isProfilePage = url.some(segment => segment.path === 'profile');
      });
      const userIdString = this.user.id.toString();
      this.postService.getPostsByUserId(userIdString).subscribe(posts => {
        this.posts = posts;
        console.log(posts);
      });
    } else {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
        console.log(posts);
      });
    }
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Determine if user is scrolling down
    if (scrollTop + viewportHeight >= documentHeight - 10) {
      this.nextPost();
    } else if (scrollTop <= 10) {
      this.previousPost();
    }
  }
}

import { User } from "./user.model";

export interface Post {
    id: number;
    userId: number;
    imageUrl: string;
    videoUrl:string;
    caption: string;
    likes: number;
    comments: Comment;
    createdAt: Date;
    content:string;
    user?:User;
  }
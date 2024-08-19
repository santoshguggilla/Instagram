import { User } from "./user.model";

export interface Post {
    showDetails: boolean;
    id: number;
    userId: number;
    imageUrl: string;
    videoUrl:string;
    caption: string;
    likes: number;
    createdAt: Date;
    content:string;
    user?:User;
    timestamp?: Date;
    comments:number;
  }
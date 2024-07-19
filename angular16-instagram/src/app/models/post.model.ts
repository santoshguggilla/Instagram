export interface Post {
    id: number;
    userId: number;
    imageUrl: string;
    videoUrl:string;
    caption: string;
    likes: number;
    comments: string[];
    createdAt: Date;
    content:string;

  }
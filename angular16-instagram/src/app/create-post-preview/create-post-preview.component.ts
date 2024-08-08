// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { PostService } from '../service/post.service'; // Ensure you have this service

// @Component({
//   selector: 'app-create-post-preview',
//   templateUrl: './create-post-preview.component.html',
//   styleUrls: ['./create-post-preview.component.css']
// })
// export class CreatePostPreviewComponent {
//   imageUrl: string | ArrayBuffer | null = null;
//   showDescription = false;
//   description: string = '';

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: { file: File },
//     private dialogRef: MatDialogRef<CreatePostPreviewComponent>,
//     private postService: PostService
//   ) {}

//   ngOnInit(): void {
//     if (this.data.file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         this.imageUrl = event.target?.result || null;
//       };
//       reader.readAsDataURL(this.data.file);
//     }
//   }

//   showDescriptionField(): void {
//     this.showDescription = true;
//   }

//   sharePost(): void {
//     if (this.data.file && this.description) {
//       this.postService.createPostWithDescription(this.description, this.data.file).subscribe(
//         response => {
//           console.log('Post shared successfully', response);
//           this.dialogRef.close(); // Close the dialog after sharing
//         },
//         error => {
//           console.error('Error sharing post', error);
//         }
//       );
//     } else {
//       console.error('File or description is missing');
//     }
//   }
// }

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-option-dialog',
  templateUrl: './option-dialog.component.html',
  styleUrls: ['./option-dialog.component.css']
})
export class OptionDialogComponent {
  constructor(public dialogRef: MatDialogRef<OptionDialogComponent>) { }

  handleUnfollow() {
    // Logic for unfollow action
    this.dialogRef.close('unfollow');
  }

  handleGoToPost() {
    // Logic to navigate to the post
    this.dialogRef.close('goToPost');
  }

  handleAddToFavorites() {
    // Logic to add the post to favorites
    this.dialogRef.close('addToFavorites');
  }

  handleCopyLink() {
    // Logic to copy the post link
    this.dialogRef.close('copyLink');
  }

  handleAboutThisAccount() {
    // Logic to show information about the account
    this.dialogRef.close('aboutThisAccount');
  }

  onClose(): void {
    // Close dialog
    this.dialogRef.close();
  }
}

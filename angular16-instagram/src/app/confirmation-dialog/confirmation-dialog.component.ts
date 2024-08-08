import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onDiscard(): void {
    this.dialogRef.close('discard'); // Close the dialog with 'discard' result
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without any result
  }
}
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SettingsDialogComponent>) {}

 
  logout(): void {
    this.authService.logout();
  }

  changeTheme(): void {
    // Implement theme change logic
    this.dialogRef.close();
  }
}

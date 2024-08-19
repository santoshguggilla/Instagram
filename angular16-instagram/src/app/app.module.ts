import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostListComponent } from './post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';
import { LayoutComponent } from './layout/layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ProfileUploadComponent } from './profile-upload/profile-upload.component';
import { MatCardModule } from '@angular/material/card';
import { RecommandedComponent } from './recommanded/recommanded.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ViewPostComponent } from './view-post/view-post.component';
import { MatIconModule } from '@angular/material/icon';
import { CreatePostPreviewComponent } from './create-post-preview/create-post-preview.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserprofileComponent,
    PostListComponent,
    HomeComponent,
    StatusComponent,
    LayoutComponent,
    MainLayoutComponent,
    CreatePostModalComponent,
    SidebarComponent,
    DialogComponent,
    ThemeToggleComponent,
    ProfileUploadComponent,
    RecommandedComponent,
    UserStatusComponent,
    ViewPostComponent,
    CreatePostPreviewComponent,
    ConfirmationDialogComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

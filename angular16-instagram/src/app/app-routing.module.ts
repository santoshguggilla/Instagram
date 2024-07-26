import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CreatePostModalComponent } from './create-post-modal/create-post-modal.component';
import { RecommandedComponent } from './recommanded/recommanded.component';
import { UserStatusComponent } from './user-status/user-status.component';

const routes: Routes = [

  {
    path:'',
    component:LoginformComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile/:id', component: UserprofileComponent },
      {
        path:'createPost',component:CreatePostModalComponent
      },
      {
        path:'recommandedList' , component:RecommandedComponent
      },
     
      
      // Add other routes here
    ]
  },
  {
    path:'signUp', component:SignupComponent
  },
  {
    path:'forgot-password', component:ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path:'userstatus/:id', component: UserStatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup; 
  
  constructor(private fb:FormBuilder, private authService: AuthService,private router: Router) {}

  ngOnInit(): void{
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit():void{

      const email=this.forgotPasswordForm.get('email')?.value;
      this.authService.sendResetPasswordEmail(email).subscribe(
        response => {
          console.log(response);
          
          alert('Reset password email sent successfully.');
        },
        error =>{
          if(error.error.text='MAIL_SENT'){
            alert('Reset password email sent successfully.');
            this.router.navigate(['/']);
          }else{
            console.error('Error sending reset password email:', error);
            alert('Error sending reset password email. Please try again');
          }
          
        }
      );
  }

}
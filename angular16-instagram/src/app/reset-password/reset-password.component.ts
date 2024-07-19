import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string="";
  tokenValid: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.authService.validateResetToken(this.token).subscribe(
          response => {
            this.tokenValid = true;
          },
          error => {
            if(error.error.text==='Valid token'){
              this.tokenValid = true;
            }else{
              this.errorMessage = 'Invalid or expired token.';
              this.tokenValid = false;
            }
          }
        );
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.tokenValid) {
      const newPassword = this.resetPasswordForm.get('password')?.value;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        response => {
          alert('Password reset successful');
          
          this.router.navigate(['/login']);
        },
        error => {
          if(error.error.text==='RESETED'){
            alert('Password reset successful');
            this.router.navigate(['/']);
          }else{
            this.errorMessage = 'Error resetting password. Please try again.';
          }
        }
      );
    }
  }
}

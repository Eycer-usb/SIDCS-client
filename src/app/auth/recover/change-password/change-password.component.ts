import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator';
import { AuthService } from '../../auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {password: string}) { }

  hidePassword = true;
  hideConfirmPassword = true;
  changePasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), 
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%&*:])[a-zA-Z0-9@#$%&*:]+$')]],
    confirmPassword: ['', [Validators.required, passwordMatchValidator()]]
  },
  );

  updateConfirmPasswordValidation() {
    this.changePasswordForm.get('confirmPassword')?.updateValueAndValidity();
  }
  get password() { return this.changePasswordForm.get('password'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

  requestToken() {
    this.dialogRef.close(this.password?.value);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
// import { LoginRequest } from '../../models/user/user.module';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatProgressSpinnerModule
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isLoading = false;
//   hidePassword = true;

//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     // אם המשתמש כבר מחובר, הפנה לדשבורד
//     if (this.authService.isAuthenticated()) {
//       this.router.navigate(['/dashboard']);
//       return;
//     }

//     this.initializeForm();
//   }

//   private initializeForm(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.isLoading = true;
//       const loginData: LoginRequest = this.loginForm.value;

//       this.authService.login(loginData).subscribe({
//         next: (response) => {
//           this.isLoading = false;
//           if (response.success) {
//             this.showMessage('התחברות בוצעה בהצלחה!', 'success');
//             this.router.navigate(['/dashboard']);
//           } else {
//             this.showMessage('שגיאה בהתחברות', 'error');
//           }
//         },
//         error: (error) => {
//           this.isLoading = false;
//           console.error('Login error:', error);
//           this.showMessage('אימייל או סיסמה שגויים', 'error');
//         },
//       });
//     } else {
//       this.markFormGroupTouched();
//     }
//   }

//   private markFormGroupTouched(): void {
//     Object.keys(this.loginForm.controls).forEach((key) => {
//       const control = this.loginForm.get(key);
//       control?.markAsTouched();
//     });
//   }

//   private showMessage(message: string, type: 'success' | 'error'): void {
//     this.snackBar.open(message, 'סגור', {
//       duration: 3000,
//       panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
//       horizontalPosition: 'center',
//       verticalPosition: 'top',
//     });
//   }

//   // Getters for form validation
//   get email() {
//     return this.loginForm.get('email');
//   }

//   get password() {
//     return this.loginForm.get('password');
//   }

//   getEmailErrorMessage(): string {
//     if (this.email?.hasError('required')) {
//       return 'אימייל הוא שדה חובה';
//     }
//     if (this.email?.hasError('email')) {
//       return 'אימייל לא תקין';
//     }
//     return '';
//   }

//   getPasswordErrorMessage(): string {
//     if (this.password?.hasError('required')) {
//       return 'סיסמה היא שדה חובה';
//     }
//     if (this.password?.hasError('minlength')) {
//       return 'סיסמה חייבת להכיל לפחות 6 תווים';
//     }
//     return '';
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user/user.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm!: FormGroup; // הוספת ! כדי לומר לטייפסקריפט שזה יאותחל
  isLoading = false;
  hidePassword = true;

  ngOnInit(): void {
    // אתחול הטופס קודם כל
    this.initializeForm();
    
    // אם המשתמש כבר מחובר, הפנה לדשבורד
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData: LoginRequest = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.showMessage('התחברות בוצעה בהצלחה!', 'success');
            this.router.navigate(['/dashboard']);
          } else {
            this.showMessage('שגיאה בהתחברות', 'error');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
          this.showMessage('אימייל או סיסמה שגויים', 'error');
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  // Getters for form validation
  get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'אימייל הוא שדה חובה';
    }
    if (this.email?.hasError('email')) {
      return 'אימייל לא תקין';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'סיסמה היא שדה חובה';
    }
    if (this.password?.hasError('minlength')) {
      return 'סיסמה חייבת להכיל לפחות 6 תווים';
    }
    return '';
  }
}
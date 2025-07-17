// // import { Component, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatIconModule } from '@angular/material/icon';
// // import { User } from '../../models/user/user.module';

// // @Component({
// //   selector: 'app-user-dialog',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ReactiveFormsModule,
// //     MatDialogModule,
// //     MatFormFieldModule,
// //     MatInputModule,
// //     MatButtonModule,
// //     MatIconModule
// //   ],
// //   templateUrl: './user-dialog.component.html',
// //   styleUrls: ['./user-dialog.component.css']
// // })
// // export class UserDialogComponent {
// //   private fb = inject(FormBuilder);
// //   private dialogRef = inject(MatDialogRef<UserDialogComponent>);
// //   private data = inject<Partial<User>>(MAT_DIALOG_DATA);

// //   userForm: FormGroup;
// //   isEditMode: boolean;
// //   hidePassword = true;

// //   constructor() {
// //     this.isEditMode = !!this.data?.id;
    
// //     this.userForm = this.fb.group({
// //       id: [this.data?.id || null],
// //       name: [this.data?.name || '', [Validators.required, Validators.minLength(2)]],
// //       email: [this.data?.email || '', [Validators.required, Validators.email]],
// //       password: [
// //         '', 
// //         this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]
// //       ]
// //     });
// //   }

// //   onSubmit(): void {
// //     if (this.userForm.valid) {
// //       const formData = this.userForm.value;
      
// //       // נכין את הנתונים בפורמט הנכון
// //       const userData: any = {
// //         name: formData.name?.trim(),
// //         email: formData.email?.trim()
// //       };

// //       if (this.isEditMode) {
// //         userData.id = formData.id;
// //         // רק אם הוזנה סיסמה חדשה
// //         if (formData.password?.trim()) {
// //           userData.password = formData.password.trim();
// //         }
// //       } else {
// //         // למשתמש חדש, הסיסמה חובה
// //         userData.password = formData.password?.trim();
// //       }

// //       console.log('Dialog sending data:', userData); // לדיבוג
// //       this.dialogRef.close(userData);
// //     } else {
// //       this.markFormGroupTouched();
// //     }
// //   }

// //   onCancel(): void {
// //     this.dialogRef.close();
// //   }

// //   private markFormGroupTouched(): void {
// //     Object.keys(this.userForm.controls).forEach(key => {
// //       const control = this.userForm.get(key);
// //       control?.markAsTouched();
// //     });
// //   }

// //   // Getters for form validation
// //   get name() {
// //     return this.userForm.get('name');
// //   }

// //   get email() {
// //     return this.userForm.get('email');
// //   }

// //   get password() {
// //     return this.userForm.get('password');
// //   }

// //   getNameErrorMessage(): string {
// //     if (this.name?.hasError('required')) {
// //       return 'שם הוא שדה חובה';
// //     }
// //     if (this.name?.hasError('minlength')) {
// //       return 'שם חייב להכיל לפחות 2 תווים';
// //     }
// //     return '';
// //   }

// //   getEmailErrorMessage(): string {
// //     if (this.email?.hasError('required')) {
// //       return 'אימייל הוא שדה חובה';
// //     }
// //     if (this.email?.hasError('email')) {
// //       return 'אימייל לא תקין';
// //     }
// //     return '';
// //   }

// //   getPasswordErrorMessage(): string {
// //     if (this.password?.hasError('required')) {
// //       return 'סיסמה היא שדה חובה';
// //     }
// //     if (this.password?.hasError('minlength')) {
// //       return 'סיסמה חייבת להכיל לפחות 6 תווים';
// //     }
// //     return '';
// //   }
// // }



// import { Component, Inject, type OnInit } from "@angular/core"
// import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog"
// import type { User } from "../../models/user/user.module"
// import { CommonModule } from "@angular/common"
// import { MatFormFieldModule } from "@angular/material/form-field"
// import { MatInputModule } from "@angular/material/input"
// import { MatButtonModule } from "@angular/material/button"
// import { MatIconModule } from "@angular/material/icon"

// @Component({
//   selector: "app-user-dialog",
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule
//   ],
//   templateUrl: "./user-dialog.component.html",
//   styleUrls: ["./user-dialog.component.css"],
// })
// export class UserDialogComponent implements OnInit {
//   userForm!: FormGroup
//   isEditMode = false
//   dialogTitle = "הוספת משתמש חדש"
//   hidePassword = true;

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<UserDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { user: User | null }
//   ) { }

//   ngOnInit(): void {
//     this.isEditMode = !!this.data?.user
//     this.dialogTitle = this.isEditMode ? "עריכת משתמש" : "הוספת משתמש חדש"

//     console.log("Dialog initialized with data:", this.data)
//     this.initForm()
//   }

//   private initForm(): void {
//     // בסיס הטופס
//     const formConfig: any = {
//       name: [this.data?.user?.name || "", [Validators.required, Validators.minLength(2)]],
//       email: [this.data?.user?.email || "", [Validators.required, Validators.email]],
//     }

//     // אם זה מצב הוספה, הסיסמה חובה
//     // אם זה מצב עריכה, הסיסמה אופציונלית
//     if (!this.isEditMode) {
//       formConfig["password"] = ["", [Validators.required, Validators.minLength(6)]]
//     } else {
//       formConfig["password"] = ["", [Validators.minLength(6)]] // אופציונלי בעריכה
//     }

//     this.userForm = this.fb.group(formConfig)

//     console.log("Form initialized:", this.userForm.value)
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       const formData = this.userForm.value

//       // נכין את הנתונים בפורמט הנכון
//       const userData: any = {
//         name: formData.name?.trim(),
//         email: formData.email?.trim(),
//       }

//       if (this.isEditMode) {
//         // במצב עריכה, נוסיף את ה-ID
//         userData.id = this.data?.user?.id

//         // רק אם הוזנה סיסמה חדשה
//         if (formData.password?.trim()) {
//           userData.password = formData.password.trim()
//         }
//       } else {
//         // למשתמש חדש, הסיסמה חובה
//         userData.password = formData.password?.trim()
//       }

//       // הסרת שדות ריקים או undefined
//       Object.keys(userData).forEach((key) => {
//         if (userData[key] === undefined || userData[key] === null || userData[key] === "") {
//           if (key !== "password" || !this.isEditMode) {
//             // לא נמחק סיסמה ריקה במצב עריכה (זה אומר שלא רוצים לשנות)
//             delete userData[key]
//           }
//         }
//       })

//       console.log("Dialog sending data:", userData)
//       console.log("Is edit mode:", this.isEditMode)

//       this.dialogRef.close(userData)
//     } else {
//       console.log("Form is invalid:", this.userForm.errors)
//       this.markFormGroupTouched()
//     }
//   }

//   onCancel(): void {
//     this.dialogRef.close()
//   }

//   private markFormGroupTouched(): void {
//     Object.keys(this.userForm.controls).forEach((key) => {
//       const control = this.userForm.get(key)
//       control?.markAsTouched()
//     })
//   }

//   // Getters for form validation
//   get name() {
//     return this.userForm.get("name")
//   }

//   get email() {
//     return this.userForm.get("email")
//   }

//   get password() {
//     return this.userForm.get("password")
//   }

//   getNameErrorMessage(): string {
//     if (this.name?.hasError("required")) {
//       return "שם הוא שדה חובה"
//     }
//     if (this.name?.hasError("minlength")) {
//       return "שם חייב להכיל לפחות 2 תווים"
//     }
//     return ""
//   }

//   getEmailErrorMessage(): string {
//     if (this.email?.hasError("required")) {
//       return "אימייל הוא שדה חובה"
//     }
//     if (this.email?.hasError("email")) {
//       return "אימייל לא תקין"
//     }
//     return ""
//   }

//   getPasswordErrorMessage(): string {
//     if (this.password?.hasError("required")) {
//       return "סיסמה היא שדה חובה"
//     }
//     if (this.password?.hasError("minlength")) {
//       return "סיסמה חייבת להכיל לפחות 6 תווים"
//     }
//     return ""
//   }
// }




import { Component, Inject, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog"
import { User } from '../../models/user/user.module';
import { CommonModule } from "@angular/common"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.css"],
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup
  isEditMode = false
  dialogTitle = "הוספת משתמש חדש"
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null; isEdit?: boolean }
  ) {}

  ngOnInit(): void {
    // זיהוי מצב עריכה
    this.isEditMode = !!this.data?.isEdit || (!!this.data?.user && this.data.user.id > 0)
    this.dialogTitle = this.isEditMode ? "עריכת משתמש" : "הוספת משתמש חדש"

    console.log("Dialog initialized with data:", this.data)
    console.log("Is edit mode:", this.isEditMode)

    this.initForm()
  }

  private initForm(): void {
    const user = this.data?.user

    // בסיס הטופס עם הנתונים הקיימים
    const formConfig: any = {
      name: [user?.name || "", [Validators.required, Validators.minLength(2)]],
      email: [user?.email || "", [Validators.required, Validators.email]],
    }

    // הגדרת שדה הסיסמה
    if (this.isEditMode) {
      // במצב עריכה - סיסמה אופציונלית
      formConfig["password"] = ["", [Validators.minLength(6)]]
    } else {
      // במצב הוספה - סיסמה חובה
      formConfig["password"] = ["", [Validators.required, Validators.minLength(6)]]
    }

    this.userForm = this.fb.group(formConfig)

    console.log("Form initialized with values:", this.userForm.value)
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value

      // נכין את הנתונים בפורמט הנכון
      const userData: any = {
        name: formData.name?.trim(),
        email: formData.email?.trim(),
      }

      if (this.isEditMode) {
        // במצב עריכה
        if (this.data?.user?.id) {
          userData.id = this.data.user.id
        }

        // רק אם הוזנה סיסמה חדשה
        if (formData.password?.trim()) {
          userData.password = formData.password.trim()
        }
      } else {
        // למשתמש חדש, הסיסמה חובה
        userData.password = formData.password?.trim()
      }

      console.log("Dialog sending data:", userData)
      console.log("Is edit mode:", this.isEditMode)

      this.dialogRef.close(userData)
    } else {
      console.log("Form is invalid:", this.userForm.errors)
      this.markFormGroupTouched()
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.get(key)
      control?.markAsTouched()
    })
  }

  // Getters for form validation
  get name() {
    return this.userForm.get("name")
  }

  get email() {
    return this.userForm.get("email")
  }

  get password() {
    return this.userForm.get("password")
  }

  getNameErrorMessage(): string {
    if (this.name?.hasError("required")) {
      return "שם הוא שדה חובה"
    }
    if (this.name?.hasError("minlength")) {
      return "שם חייב להכיל לפחות 2 תווים"
    }
    return ""
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError("required")) {
      return "אימייל הוא שדה חובה"
    }
    if (this.email?.hasError("email")) {
      return "אימייל לא תקין"
    }
    return ""
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError("required")) {
      return "סיסמה היא שדה חובה"
    }
    if (this.password?.hasError("minlength")) {
      return "סיסמה חייבת להכיל לפחות 6 תווים"
    }
    return ""
  }
}

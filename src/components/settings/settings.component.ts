import { Component, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatCardModule } from "@angular/material/card"

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    // MatSnackBar is provided via dependency injection, no need to import here
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  generalSettingsForm!: FormGroup
  emailSettingsForm!: FormGroup
  storageSettingsForm!: FormGroup
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForms()
  }

  private initForms(): void {
    // הגדרות כלליות
    this.generalSettingsForm = this.fb.group({
      siteName: ["ניהול תמונות משפחה", [Validators.required]],
      siteDescription: ["מערכת לניהול תמונות משפחתיות", [Validators.required]],
      itemsPerPage: [20, [Validators.required, Validators.min(5), Validators.max(100)]],
      enableRegistration: [false],
      maintenanceMode: [false],
    })

    // הגדרות אימייל
    this.emailSettingsForm = this.fb.group({
      smtpServer: ["smtp.example.com", [Validators.required]],
      smtpPort: [587, [Validators.required, Validators.min(1), Validators.max(65535)]],
      smtpUsername: ["user@example.com", [Validators.required, Validators.email]],
      smtpPassword: ["", [Validators.required]],
      senderEmail: ["noreply@example.com", [Validators.required, Validators.email]],
      senderName: ["מערכת ניהול תמונות", [Validators.required]],
    })

    // הגדרות אחסון
    this.storageSettingsForm = this.fb.group({
      storageType: ["local", [Validators.required]],
      maxFileSize: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
      allowedFileTypes: ["jpg,jpeg,png,gif", [Validators.required]],
      compressionQuality: [80, [Validators.required, Validators.min(1), Validators.max(100)]],
      createThumbnails: [true],
    })
  }

  saveGeneralSettings(): void {
    if (this.generalSettingsForm.valid) {
      this.isLoading = true

      // כאן תהיה קריאה לשרת לשמירת ההגדרות
      setTimeout(() => {
        this.isLoading = false
        this.showMessage("הגדרות כלליות נשמרו בהצלחה", "success")
      }, 800)
    } else {
      this.markFormGroupTouched(this.generalSettingsForm)
    }
  }

  saveEmailSettings(): void {
    if (this.emailSettingsForm.valid) {
      this.isLoading = true

      // כאן תהיה קריאה לשרת לשמירת הגדרות האימייל
      setTimeout(() => {
        this.isLoading = false
        this.showMessage("הגדרות אימייל נשמרו בהצלחה", "success")
      }, 800)
    } else {
      this.markFormGroupTouched(this.emailSettingsForm)
    }
  }

  saveStorageSettings(): void {
    if (this.storageSettingsForm.valid) {
      this.isLoading = true

      // כאן תהיה קריאה לשרת לשמירת הגדרות האחסון
      setTimeout(() => {
        this.isLoading = false
        this.showMessage("הגדרות אחסון נשמרו בהצלחה", "success")
      }, 800)
    } else {
      this.markFormGroupTouched(this.storageSettingsForm)
    }
  }

  testEmailConnection(): void {
    if (this.emailSettingsForm.valid) {
      this.isLoading = true

      // כאן תהיה קריאה לשרת לבדיקת חיבור האימייל
      setTimeout(() => {
        this.isLoading = false
        this.showMessage("בדיקת חיבור האימייל הצליחה", "success")
      }, 1500)
    } else {
      this.markFormGroupTouched(this.emailSettingsForm)
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key)
      control?.markAsTouched()
    })
  }

  private showMessage(message: string, type: "success" | "error"): void {
    this.snackBar.open(message, "סגור", {
      duration: 3000,
      panelClass: type === "success" ? "success-snackbar" : "error-snackbar",
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }
}

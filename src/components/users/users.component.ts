// import { Component, OnInit, signal, computed, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatSortModule, Sort } from '@angular/material/sort';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatChipsModule } from '@angular/material/chips';
// import { UserDialogComponent } from '../user-dialog/user-dialog.component';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user/user.module';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatInputModule,
//     MatFormFieldModule,
//     MatButtonModule,
//     MatIconModule,
//     MatCardModule,
//     MatProgressSpinnerModule,
//     MatTooltipModule,
//     MatChipsModule
//   ],
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
// })
// export class UsersComponent implements OnInit {
//   private userService = inject(UserService);
//   private dialog = inject(MatDialog);
//   private snackBar = inject(MatSnackBar);

//   // Signals
//   users = signal<User[]>([]);
//   filteredUsers = signal<User[]>([]);
//   isLoading = signal(true);
//   searchTerm = signal('');
  
//   // Pagination
//   pageSize = signal(10);
//   currentPage = signal(0);
//   pageSizeOptions = [5, 10, 25, 50];
  
//   // Table
//   displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  
//   // Computed values
//   totalUsers = computed(() => this.filteredUsers().length);
//   paginatedUsers = computed(() => {
//     const start = this.currentPage() * this.pageSize();
//     const end = start + this.pageSize();
//     return this.filteredUsers().slice(start, end);
//   });

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.isLoading.set(true);
//     this.userService.getAllUsers().subscribe({
//       next: (data) => {
//         this.users.set(data);
//         this.applyFilter();
//         this.isLoading.set(false);
//       },
//       error: (error) => {
//         console.error('Error loading users:', error);
//         this.showMessage('שגיאה בטעינת המשתמשים', 'error');
//         this.isLoading.set(false);
//       }
//     });
//   }

//   applyFilter(): void {
//     const term = this.searchTerm().toLowerCase();
//     if (!term) {
//       this.filteredUsers.set(this.users());
//       return;
//     }
    
//     const filtered = this.users().filter(user => 
//       user.name.toLowerCase().includes(term) || 
//       user.email.toLowerCase().includes(term)
//     );
    
//     this.filteredUsers.set(filtered);
//     this.currentPage.set(0); // Reset to first page when filtering
//   }

//   onSearchChange(event: Event): void {
//     const value = (event.target as HTMLInputElement).value;
//     this.searchTerm.set(value);
//     this.applyFilter();
//   }

//   onPageChange(event: PageEvent): void {
//     this.pageSize.set(event.pageSize);
//     this.currentPage.set(event.pageIndex);
//   }

//   onSortChange(sort: Sort): void {
//     const data = [...this.filteredUsers()];
    
//     if (!sort.active || sort.direction === '') {
//       this.filteredUsers.set(data);
//       return;
//     }

//     const sortedData = data.sort((a, b) => {
//       const isAsc = sort.direction === 'asc';
//       switch (sort.active) {
//         case 'id': return this.compare(a.id, b.id, isAsc);
//         case 'name': return this.compare(a.name, b.name, isAsc);
//         case 'email': return this.compare(a.email, b.email, isAsc);
//         case 'createdAt': return this.compare(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime(), isAsc);
//         default: return 0;
//       }
//     });
    
//     this.filteredUsers.set(sortedData);
//   }

//   private compare(a: number | string, b: number | string, isAsc: boolean): number {
//     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
//   }

//   // openUserDialog(user?: User): void {
//   //   const dialogRef = this.dialog.open(UserDialogComponent, {
//   //     width: '500px',
//   //     data: user ? { ...user } : { name: '', email: '', password: '' },
//   //     direction: 'rtl'
//   //   });

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     if (!result) return;
      
//   //     if (result.id) {
//   //       // Update existing user
//   //       this.userService.updateUser(result.id, result).subscribe({
//   //         next: () => {
//   //           this.showMessage('המשתמש עודכן בהצלחה', 'success');
//   //           this.loadUsers();
//   //         },
//   //         error: (error) => {
//   //           console.error('Error updating user:', error);
//   //           this.showMessage('שגיאה בעדכון המשתמש', 'error');
//   //         }
//   //       });
//   //     } else {
//   //       // Add new user
//   //       this.userService.addUser(result).subscribe({
//   //         next: () => {
//   //           this.showMessage('המשתמש נוסף בהצלחה', 'success');
//   //           this.loadUsers();
//   //         },
//   //         error: (error) => {
//   //           console.error('Error adding user:', error);
//   //           this.showMessage('שגיאה בהוספת המשתמש', 'error');
//   //         }
//   //       });
//   //     }
//   //   });
//   // }


//   openUserDialog(user?: User): void {
//     const dialogRef = this.dialog.open(UserDialogComponent, {
//       width: '500px',
//       data: user ? { ...user } : null, // שינוי כאן
//       direction: 'rtl'
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       if (!result) return;
      
//       console.log('Received from dialog:', result); // לדיבוג
      
//       if (result.id) {
//         // Update existing user
//         this.userService.updateUser(result.id, result).subscribe({
//           next: () => {
//             this.showMessage('המשתמש עודכן בהצלחה', 'success');
//             this.loadUsers();
//           },
//           error: (error) => {
//             console.error('Error updating user:', error);
//             this.showMessage(`שגיאה בעדכון המשתמש: ${error.error?.message || error.message}`, 'error');
//           }
//         });
//       } else {
//         // Add new user
//         this.userService.addUser(result).subscribe({
//           next: () => {
//             this.showMessage('המשתמש נוסף בהצלחה', 'success');
//             this.loadUsers();
//           },
//           error: (error) => {
//             console.error('Error adding user:', error);
//             this.showMessage(`שגיאה בהוספת המשתמש: ${error.error?.message || error.message}`, 'error');
//           }
//         });
//       }
//     });
//   }
//   deleteUser(user: User): void {
//     if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.name}?`)) {
//       this.userService.deleteUser(user.id).subscribe({
//         next: () => {
//           this.showMessage('המשתמש נמחק בהצלחה', 'success');
//           this.loadUsers();
//         },
//         error: (error) => {
//           console.error('Error deleting user:', error);
//           this.showMessage('שגיאה במחיקת המשתמש', 'error');
//         }
//       });
//     }
//   }

//   private showMessage(message: string, type: 'success' | 'error'): void {
//     this.snackBar.open(message, 'סגור', {
//       duration: 3000,
//       panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
//       horizontalPosition: 'center',
//       verticalPosition: 'top',
//     });
//   }

//   formatDate(date: Date | string): string {
//     if (!date) return '';
//     const d = new Date(date);
//     return d.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   }
// }



import { Component, type OnInit, signal, computed, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule, type PageEvent } from "@angular/material/paginator"
import { MatSortModule, type Sort } from "@angular/material/sort"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBar } from "@angular/material/snack-bar"
import { MatDialog } from "@angular/material/dialog"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatChipsModule } from "@angular/material/chips"
import { UserDialogComponent } from "../user-dialog/user-dialog.component"
import { UserService } from "../../services/user.service"
import { User } from '../../models/user/user.module';

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  // Signals
  users = signal<User[]>([])
  filteredUsers = signal<User[]>([])
  isLoading = signal(true)
  searchTerm = signal("")

  // Pagination
  pageSize = signal(10)
  currentPage = signal(0)
  pageSizeOptions = [5, 10, 25, 50]

  // Table
  displayedColumns: string[] = ["id", "name", "email", "createdAt", "actions"]

  // Computed values
  totalUsers = computed(() => this.filteredUsers().length)
  paginatedUsers = computed(() => {
    const start = this.currentPage() * this.pageSize()
    const end = start + this.pageSize()
    return this.filteredUsers().slice(start, end)
  })

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.isLoading.set(true)
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data)
        this.applyFilter()
        this.isLoading.set(false)
      },
      error: (error) => {
        console.error("Error loading users:", error)
        this.showMessage("שגיאה בטעינת המשתמשים", "error")
        this.isLoading.set(false)
      },
    })
  }

  applyFilter(): void {
    const term = this.searchTerm().toLowerCase()
    if (!term) {
      this.filteredUsers.set(this.users())
      return
    }

    const filtered = this.users().filter(
      (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    )

    this.filteredUsers.set(filtered)
    this.currentPage.set(0) // Reset to first page when filtering
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.searchTerm.set(value)
    this.applyFilter()
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize)
    this.currentPage.set(event.pageIndex)
  }

  onSortChange(sort: Sort): void {
    const data = [...this.filteredUsers()]

    if (!sort.active || sort.direction === "") {
      this.filteredUsers.set(data)
      return
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc"
      switch (sort.active) {
        case "id":
          return this.compare(a.id, b.id, isAsc)
        case "name":
          return this.compare(a.name, b.name, isAsc)
        case "email":
          return this.compare(a.email, b.email, isAsc)
        case "createdAt":
          return this.compare(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime(), isAsc)
        default:
          return 0
      }
    })

    this.filteredUsers.set(sortedData)
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

  openUserDialog(user?: User): void {
    console.log("Opening dialog with user:", user) // דיבוג

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "500px",
      data: {
        user: user || null,
        isEdit: !!user, // פלג ברור למצב עריכה
      },
      direction: "rtl",
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return

      console.log("Received from dialog:", result) // לדיבוג

      if (user && user.id) {
        // Update existing user
        console.log("Updating existing user with ID:", user.id)
        this.userService.updateUser(user.id, result).subscribe({
          next: () => {
            this.showMessage("המשתמש עודכן בהצלחה", "success")
            this.loadUsers()
          },
          error: (error) => {
            console.error("Error updating user:", error)
            this.showMessage(`שגיאה בעדכון המשתמש: ${error.message}`, "error")
          },
        })
      } else {
        // Add new user
        console.log("Adding new user")
        this.userService.addUser(result).subscribe({
          next: () => {
            this.showMessage("המשתמש נוסף בהצלחה", "success")
            this.loadUsers()
          },
          error: (error) => {
            console.error("Error adding user:", error)
            this.showMessage(`שגיאה בהוספת המשתמש: ${error.message}`, "error")
          },
        })
      }
    })
  }

  deleteUser(user: User): void {
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.showMessage("המשתמש נמחק בהצלחה", "success")
          this.loadUsers()
        },
        error: (error) => {
          console.error("Error deleting user:", error)
          this.showMessage("שגיאה במחיקת המשתמש", "error")
        },
      })
    }
  }

  private showMessage(message: string, type: "success" | "error"): void {
    this.snackBar.open(message, "סגור", {
      duration: 3000,
      panelClass: type === "success" ? "success-snackbar" : "error-snackbar",
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  formatDate(date: Date | string): string {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}

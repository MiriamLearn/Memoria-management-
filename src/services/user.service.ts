// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../models/user/user.module';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://localhost:5023/api/user'; 

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiUrl);
//   }

//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/${id}`);
//   }

//   addUser(user: Partial<User>): Observable<any> {
//     // נוודא שאנחנו שולחים רק את השדות הנדרשים
//     const userData = {
//       name: user.name,
//       email: user.email,
//       password: user.password
//     };
    
//     console.log('Sending user data:', userData); // לדיבוג
//     return this.http.post(this.apiUrl, userData);
//   }

//   updateUser(id: number, user: Partial<User>): Observable<any> {
//     // נוודא שאנחנו שולחים רק את השדות הנדרשים
//     const userData: any = {
//       name: user.name,
//       email: user.email,
//       updatedBy: user.id || 0 // נוסיף את השדה הזה אם השרת מצפה לו
//     };
    
//     // רק אם יש סיסמה חדשה
//     if (user.password) {
//       userData.password = user.password;
//     }
    
//     console.log('Updating user data:', userData); // לדיבוג
//     return this.http.put(`${this.apiUrl}/${id}`, userData);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   getUsersStatistics(): Observable<any> {
//     return this.getAllUsers();
//   }
// }



import { Injectable, inject } from "@angular/core"
import { HttpClient, type HttpErrorResponse } from "@angular/common/http"
import { type Observable, throwError } from "rxjs"
import { catchError, tap } from "rxjs/operators"
import type { User } from "../models/user/user.module"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private http = inject(HttpClient)
  private apiUrl = "http://localhost:5023/api/user"

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(catchError(this.handleError))
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }

  addUser(user: Partial<User>): Observable<any> {
    // נוודא שאנחנו שולחים רק את השדות הנדרשים
    const userData = {
      name: user.name?.trim(),
      email: user.email?.trim(),
      password: user.password?.trim(),
    }

    console.log("Adding user - sending data:", userData)
    return this.http.post(this.apiUrl, userData).pipe(
      tap((response) => console.log("Add user response:", response)),
      catchError(this.handleError),
    )
  }

  updateUser(id: number, user: Partial<User>): Observable<any> {
    // נכין את הנתונים בפורמט הנכון לשרת
    const userData: any = {
      id: id, // וודא שה-ID נכלל
      name: user.name?.trim(),
      email: user.email?.trim(),
    }

    // רק אם יש סיסמה חדשה, נוסיף אותה
    if (user.password && user.password.trim()) {
      userData.password = user.password.trim()
    }

    console.log(`Updating user ${id} - URL: ${this.apiUrl}/${id}`)
    console.log("Update user - sending data:", userData)

    return this.http.put(`${this.apiUrl}/${id}`, userData).pipe(
      tap((response) => console.log("Update user response:", response)),
      catchError((error) => {
        console.error("Update user error details:", {
          status: error.status,
          statusText: error.statusText,
          error: error.error,
          url: error.url,
          sentData: userData,
        })
        return this.handleError(error)
      }),
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError))
  }

  getUsersStatistics(): Observable<any> {
    return this.getAllUsers().pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    console.error("API Error Full Details:", {
      status: error.status,
      statusText: error.statusText,
      error: error.error,
      message: error.message,
      url: error.url,
    })

    let errorMessage = "אירעה שגיאה לא צפויה"

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `שגיאה: ${error.error.message}`
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          // נציג פרטים נוספים על שגיאת 400
          const serverError = error.error
          if (typeof serverError === "string") {
            errorMessage = `שגיאה בבקשה: ${serverError}`
          } else if (serverError?.message) {
            errorMessage = `שגיאה בבקשה: ${serverError.message}`
          } else if (serverError?.errors) {
            // אם יש שגיאות ולידציה מפורטות
            const validationErrors = Object.values(serverError.errors).flat()
            errorMessage = `שגיאות ולידציה: ${validationErrors.join(", ")}`
          } else {
            errorMessage = "שגיאה בבקשה: נתונים לא תקינים"
          }
          break
        case 401:
          errorMessage = "אינך מורשה לבצע פעולה זו"
          break
        case 404:
          errorMessage = "המשאב המבוקש לא נמצא"
          break
        case 500:
          errorMessage = "שגיאה בשרת, נסה שוב מאוחר יותר"
          break
        default:
          errorMessage = `שגיאה: ${error.status} - ${error.message}`
      }
    }

    return throwError(() => new Error(errorMessage))
  }
}

// import { Injectable, inject } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { LoginRequest, LoginResponse } from '../models/user/user.module';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://localhost:5023/api'; // עדכני לכתובת השרת שלך
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor() {
//     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue() {
//     return this.currentUserSubject.value;
//   }

//   login(loginData: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/user/login`, loginData).pipe(
//       map((response) => {
//         if (response.success && response.token) {
//           localStorage.setItem('token', response.token);
//           localStorage.setItem('currentUser', JSON.stringify(response.user));
//           this.currentUserSubject.next(response.user);
//         }
//         return response;
//       }),
//       catchError(this.handleError)
//     );
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }

//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('token');
//     if (!token) return false;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const currentTime = Math.floor(Date.now() / 1000);
//       return payload.exp > currentTime;
//     } catch {
//       return false;
//     }
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'אירעה שגיאה לא צפויה';

//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `שגיאה: ${error.error.message}`;
//     } else {
//       // Server-side error
//       switch (error.status) {
//         case 401:
//           errorMessage = 'אימייל או סיסמה שגויים';
//           break;
//         case 403:
//           errorMessage = 'אין לך הרשאה לגשת למערכת';
//           break;
//         case 500:
//           errorMessage = 'שגיאה בשרת, נסה שוב מאוחר יותר';
//           break;
//         default:
//           errorMessage = `שגיאה: ${error.status} - ${error.message}`;
//       }
//     }

//     return throwError(() => new Error(errorMessage));
//   }
// }



import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5023/api'; // עדכני לכתובת השרת שלך
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor() {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const user = storedUser ? JSON.parse(storedUser) : null;
      this.currentUserSubject = new BehaviorSubject<any>(user);
      this.currentUser = this.currentUserSubject.asObservable();
    } catch (error) {
      console.error('Error parsing stored user:', error);
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/user/login`, loginData).pipe(
      map((response) => {
        if (response.success && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'אירעה שגיאה לא צפויה';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `שגיאה: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'אימייל או סיסמה שגויים';
          break;
        case 403:
          errorMessage = 'אין לך הרשאה לגשת למערכת';
          break;
        case 500:
          errorMessage = 'שגיאה בשרת, נסה שוב מאוחר יותר';
          break;
        default:
          errorMessage = `שגיאה: ${error.status} - ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
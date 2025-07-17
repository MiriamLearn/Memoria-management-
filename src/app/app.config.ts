import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { routes } from './app.routes';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { provideJwtModule } from '../providers/jwt.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideJwtModule(),
    { 
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        hasBackdrop: true,
        disableClose: true
      } 
    },
    { 
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      } 
    }
  ]
};
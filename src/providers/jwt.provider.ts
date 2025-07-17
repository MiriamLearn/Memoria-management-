import { EnvironmentProviders, Provider } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function provideJwtModule(): (Provider | EnvironmentProviders)[] {
  return [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7777'], // עדכני לפי הפורט של השרת שלך
        disallowedRoutes: ['localhost:7777/api/user/login'],
      },
    }).providers || []
  ];
}
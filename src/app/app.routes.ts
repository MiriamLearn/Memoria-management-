import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { UsersComponent } from '../components/users/users.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { SettingsComponent } from '../components/settings/settings.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'users', pathMatch: 'full' },
        { path: 'users', component: UsersComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'settings', component: SettingsComponent },
      ]
    },
    { path: '**', redirectTo: '/login' },
  ];


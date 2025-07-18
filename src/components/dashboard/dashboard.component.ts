// import { Component, OnInit, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatToolbarModule,
//     MatSidenavModule,
//     MatListModule,
//     MatIconModule,
//     MatButtonModule,
//     MatMenuModule,
//     RouterOutlet,
//     RouterLink,
//     RouterLinkActive
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   currentUser: any;
//   sidenavOpened = true;

//   menuItems = [
//     {
//       title: 'ניהול משתמשים',
//       icon: 'people',
//       route: '/dashboard/users',
//       description: 'הוספה, עריכה ומחיקה של משתמשים'
//     },
//     {
//       title: 'דוחות וסטטיסטיקות',
//       icon: 'analytics',
//       route: '/dashboard/reports',
//       description: 'צפייה בנתונים וגרפים'
//     },
//     {
//       title: 'הגדרות מערכת',
//       icon: 'settings',
//       route: '/dashboard/settings',
//       description: 'ניהול הגדרות כלליות'
//     }
//   ];

//   ngOnInit(): void {
//     this.currentUser = this.authService.currentUserValue;
//     if (!this.currentUser) {
//       this.router.navigate(['/login']);
//     }
//   }

//   toggleSidenav(): void {
//     this.sidenavOpened = !this.sidenavOpened;
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }


import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  currentUser: any;
  sidenavOpened = true;
  isMobile = false;

  menuItems = [
    {
      title: 'ניהול משתמשים',
      icon: 'people',
      route: '/dashboard/users',
      description: 'הוספה, עריכה ומחיקה של משתמשים'
    },
    {
      title: 'דוחות וסטטיסטיקות',
      icon: 'analytics',
      route: '/dashboard/reports',
      description: 'צפייה בנתונים וגרפים'
    },
    {
      title: 'הגדרות מערכת',
      icon: 'settings',
      route: '/dashboard/settings',
      description: 'ניהול הגדרות כלליות'
    }
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    // בדיקה אם זה מובייל
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.sidenavOpened = false;
        }
      });
  }

  toggleSidenav(): void {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.sidenavOpened = !this.sidenavOpened;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getSidenavMode(): 'side' | 'over' {
    return this.isMobile ? 'over' : 'side';
  }
}







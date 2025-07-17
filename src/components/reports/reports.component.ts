// // import { Component, OnInit, signal, computed, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { MatCardModule } from '@angular/material/card';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatDatepickerModule } from '@angular/material/datepicker';
// // import { MatNativeDateModule } from '@angular/material/core';
// // import { MatInputModule } from '@angular/material/input';
// // import { FormsModule } from '@angular/forms';
// // import { BaseChartDirective } from 'ng2-charts';
// // import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
// // import { UserService } from '../../services/user.service';
// // import { User } from '../../models/user/user.module';

// // // רישום כל הרכיבים של Chart.js
// // Chart.register(...registerables);

// // @Component({
// //   selector: 'app-reports',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     FormsModule,
// //     MatCardModule,
// //     MatIconModule,
// //     MatButtonModule,
// //     MatProgressSpinnerModule,
// //     MatSelectModule,
// //     MatFormFieldModule,
// //     MatDatepickerModule,
// //     MatNativeDateModule,
// //     MatInputModule,
// //     BaseChartDirective
// //   ],
// //   templateUrl: './reports.component.html',
// //   styleUrls: ['./reports.component.css']
// // })
// // export class ReportsComponent implements OnInit {
// //   private userService = inject(UserService);

// //   // Signals
// //   users = signal<User[]>([]);
// //   isLoading = signal(true);
// //   selectedPeriod = signal('all');

// //   // Chart Data
// //   usersOverTimeChart = signal<ChartData<'line'>>({
// //     labels: [],
// //     datasets: []
// //   });

// //   usersPerMonthChart = signal<ChartData<'bar'>>({
// //     labels: [],
// //     datasets: []
// //   });

// //   // Chart Options
// //   lineChartOptions: ChartConfiguration['options'] = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         display: true,
// //         position: 'top',
// //         labels: {
// //           font: {
// //             family: 'Roboto'
// //           }
// //         }
// //       },
// //       title: {
// //         display: true,
// //         text: 'מגמת הרשמות משתמשים לאורך זמן',
// //         font: {
// //           size: 16,
// //           family: 'Roboto'
// //         }
// //       }
// //     },
// //     scales: {
// //       x: {
// //         display: true,
// //         title: {
// //           display: true,
// //           text: 'תאריך'
// //         }
// //       },
// //       y: {
// //         display: true,
// //         title: {
// //           display: true,
// //           text: 'מספר משתמשים'
// //         },
// //         beginAtZero: true
// //       }
// //     }
// //   };

// //   barChartOptions: ChartConfiguration['options'] = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         display: true,
// //         position: 'top'
// //       },
// //       title: {
// //         display: true,
// //         text: 'הרשמות משתמשים לפי חודש',
// //         font: {
// //           size: 16,
// //           family: 'Roboto'
// //         }
// //       }
// //     },
// //     scales: {
// //       x: {
// //         display: true,
// //         title: {
// //           display: true,
// //           text: 'חודש'
// //         }
// //       },
// //       y: {
// //         display: true,
// //         title: {
// //           display: true,
// //           text: 'מספר הרשמות'
// //         },
// //         beginAtZero: true
// //       }
// //     }
// //   };

// //   // Chart Types
// //   lineChartType: ChartType = 'line';
// //   barChartType: ChartType = 'bar';

// //   // Computed Statistics
// //   totalUsers = computed(() => this.users().length);
  
// //   usersThisMonth = computed(() => {
// //     const now = new Date();
// //     const thisMonth = now.getMonth();
// //     const thisYear = now.getFullYear();
    
// //     return this.users().filter(user => {
// //       const userDate = new Date(user.createdAt);
// //       return userDate.getMonth() === thisMonth && userDate.getFullYear() === thisYear;
// //     }).length;
// //   });

// //   usersThisWeek = computed(() => {
// //     const now = new Date();
// //     const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
// //     return this.users().filter(user => {
// //       const userDate = new Date(user.createdAt);
// //       return userDate >= weekAgo;
// //     }).length;
// //   });

// //   averageUsersPerMonth = computed(() => {
// //     const users = this.users();
// //     if (users.length === 0) return 0;
    
// //     const monthsMap = new Map<string, number>();
// //     users.forEach(user => {
// //       const date = new Date(user.createdAt);
// //       const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
// //       monthsMap.set(monthKey, (monthsMap.get(monthKey) || 0) + 1);
// //     });
    
// //     return monthsMap.size > 0 ? Math.round(users.length / monthsMap.size) : 0;
// //   });

// //   ngOnInit(): void {
// //     this.loadData();
// //   }

// //   loadData(): void {
// //     this.isLoading.set(true);
    
// //     this.userService.getAllUsers().subscribe({
// //       next: (data) => {
// //         this.users.set(data);
// //         this.generateChartData();
// //         this.isLoading.set(false);
// //       },
// //       error: (error) => {
// //         console.error('Error loading users:', error);
// //         this.isLoading.set(false);
// //       }
// //     });
// //   }

// //   generateChartData(): void {
// //     const users = this.users();
    
// //     // יצירת נתונים לגרף קו - מגמת הרשמות לאורך זמן
// //     this.generateLineChartData(users);
    
// //     // יצירת נתונים לגרף עמודות - הרשמות לפי חודש
// //     this.generateBarChartData(users);
// //   }

// //   private generateLineChartData(users: User[]): void {
// //     // מיון המשתמשים לפי תאריך יצירה
// //     const sortedUsers = [...users].sort((a, b) => 
// //       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
// //     );

// //     const dailyCount = new Map<string, number>();
// //     let cumulativeCount = 0;

// //     sortedUsers.forEach(user => {
// //       const date = new Date(user.createdAt);
// //       const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
// //       if (!dailyCount.has(dateKey)) {
// //         dailyCount.set(dateKey, 0);
// //       }
// //       dailyCount.set(dateKey, dailyCount.get(dateKey)! + 1);
// //     });

// //     const labels: string[] = [];
// //     const data: number[] = [];

// //     // יצירת תוויות ונתונים מצטברים
// //     dailyCount.forEach((count, date) => {
// //       cumulativeCount += count;
// //       labels.push(new Date(date).toLocaleDateString('he-IL'));
// //       data.push(cumulativeCount);
// //     });

// //     this.usersOverTimeChart.set({
// //       labels,
// //       datasets: [
// //         {
// //           label: 'סה"כ משתמשים רשומים',
// //           data,
// //           borderColor: '#667eea',
// //           backgroundColor: 'rgba(102, 126, 234, 0.1)',
// //           fill: true,
// //           tension: 0.4
// //         }
// //       ]
// //     });
// //   }

// //   private generateBarChartData(users: User[]): void {
// //     const monthlyCount = new Map<string, number>();

// //     users.forEach(user => {
// //       const date = new Date(user.createdAt);
// //       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
// //       monthlyCount.set(monthKey, (monthlyCount.get(monthKey) || 0) + 1);
// //     });

// //     // מיון לפי חודש
// //     const sortedMonths = Array.from(monthlyCount.entries())
// //       .sort(([a], [b]) => a.localeCompare(b));

// //     const labels = sortedMonths.map(([month]) => {
// //       const [year, monthNum] = month.split('-');
// //       const date = new Date(parseInt(year), parseInt(monthNum) - 1);
// //       return date.toLocaleDateString('he-IL', { year: 'numeric', month: 'long' });
// //     });

// //     const data = sortedMonths.map(([, count]) => count);

// //     this.usersPerMonthChart.set({
// //       labels,
// //       datasets: [
// //         {
// //           label: 'הרשמות חדשות',
// //           data,
// //           backgroundColor: [
// //             'rgba(102, 126, 234, 0.8)',
// //             'rgba(118, 75, 162, 0.8)',
// //             'rgba(255, 99, 132, 0.8)',
// //             'rgba(54, 162, 235, 0.8)',
// //             'rgba(255, 205, 86, 0.8)',
// //             'rgba(75, 192, 192, 0.8)'
// //           ],
// //           borderColor: [
// //             '#667eea',
// //             '#764ba2',
// //             '#ff6384',
// //             '#36a2eb',
// //             '#ffcd56',
// //             '#4bc0c0'
// //           ],
// //           borderWidth: 2
// //         }
// //       ]
// //     });
// //   }

// //   onPeriodChange(): void {
// //     // כאן ניתן להוסיף לוגיקה לסינון לפי תקופה
// //     this.generateChartData();
// //   }

// //   refreshData(): void {
// //     this.loadData();
// //   }

// //   exportData(): void {
// //     // כאן ניתן להוסיף לוגיקה לייצוא נתונים
// //     console.log('Exporting data...');
// //   }
// // }



// import { Component, OnInit, signal, computed, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { BaseChartDirective } from 'ng2-charts';
// import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user/user.module';

// // Register Chart.js components
// Chart.register(...registerables);

// @Component({
//   selector: 'app-reports',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatCardModule,
//     MatIconModule,
//     MatButtonModule,
//     MatProgressSpinnerModule,
//     MatSelectModule,
//     MatFormFieldModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatInputModule,
//     BaseChartDirective
//   ],
//   templateUrl: './reports.component.html',
//   styleUrls: ['./reports.component.css']
// })
// export class ReportsComponent implements OnInit {
//   private userService = inject(UserService);

//   // Signals
//   users = signal<User[]>([]);
//   isLoading = signal<boolean>(true);
//   selectedPeriod = signal<string>('all');

//   // Date of last data update
//   lastUpdated: string = '';

//   // Chart Data
//   usersOverTimeChart = signal<ChartData<'line'>>({ labels: [], datasets: [] });
//   usersPerMonthChart = signal<ChartData<'bar'>>({ labels: [], datasets: [] });

//   // Chart Options
//   lineChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: { font: { family: 'Roboto' } }
//       },
//       title: {
//         display: true,
//         text: 'מגמת הרשמות משתמשים לאורך זמן',
//         font: { size: 16, family: 'Roboto' }
//       }
//     },
//     scales: {
//       x: {
//         display: true,
//         title: { display: true, text: 'תאריך' }
//       },
//       y: {
//         display: true,
//         title: { display: true, text: 'מספר משתמשים' },
//         beginAtZero: true
//       }
//     }
//   };

//   barChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: 'top' },
//       title: {
//         display: true,
//         text: 'הרשמות משתמשים לפי חודש',
//         font: { size: 16, family: 'Roboto' }
//       }
//     },
//     scales: {
//       x: {
//         display: true,
//         title: { display: true, text: 'חודש' }
//       },
//       y: {
//         display: true,
//         title: { display: true, text: 'מספר הרשמות' },
//         beginAtZero: true
//       }
//     }
//   };

//   // Chart Types
//   lineChartType: ChartType = 'line';
//   barChartType: ChartType = 'bar';

//   // Computed Statistics
//   totalUsers = computed(() => this.users().length);

//   usersThisMonth = computed(() => {
//     const now = new Date();
//     return this.users().filter(user => {
//       const d = new Date(user.createdAt);
//       return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//     }).length;
//   });

//   usersThisWeek = computed(() => {
//     const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//     return this.users().filter(user => new Date(user.createdAt) >= weekAgo).length;
//   });

//   averageUsersPerMonth = computed(() => {
//     const users = this.users();
//     if (!users.length) return 0;
//     const months = new Map<string, number>();
//     users.forEach(user => {
//       const d = new Date(user.createdAt);
//       const key = `${d.getFullYear()}-${d.getMonth()}`;
//       months.set(key, (months.get(key) || 0) + 1);
//     });
//     return Math.round(users.length / months.size);
//   });

//   ngOnInit(): void {
//     this.loadData();
//     this.updateLastUpdated();
//   }

//   // Update the 'lastUpdated' field
//   updateLastUpdated(): void {
//     this.lastUpdated = new Date().toLocaleString('he-IL');
//   }

//   loadData(): void {
//     this.isLoading.set(true);
//     this.userService.getAllUsers().subscribe({
//       next: (data) => {
//         this.users.set(data);
//         this.generateChartData();
//         this.updateLastUpdated();
//         this.isLoading.set(false);
//       },
//       error: (error) => {
//         console.error('Error loading users:', error);
//         this.isLoading.set(false);
//       }
//     });
//   }

//   generateChartData(): void {
//     const users = this.users();
//     this.generateLineChartData(users);
//     this.generateBarChartData(users);
//   }

//   private generateLineChartData(users: User[]): void {
//     const sorted = [...users].sort((a, b) =>
//       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     );

//     const daily = new Map<string, number>();
//     let cumulative = 0;

//     sorted.forEach(u => {
//       const date = new Date(u.createdAt).toISOString().split('T')[0];
//       daily.set(date, (daily.get(date) || 0) + 1);
//     });

//     const labels: string[] = [];
//     const data: number[] = [];

//     daily.forEach((count, date) => {
//       cumulative += count;
//       labels.push(new Date(date).toLocaleDateString('he-IL'));
//       data.push(cumulative);
//     });

//     this.usersOverTimeChart.set({
//       labels,
//       datasets: [{
//         label: 'סה"כ משתמשים רשומים',
//         data,
//         borderColor: '#667eea',
//         backgroundColor: 'rgba(102, 126, 234, 0.1)',
//         fill: true,
//         tension: 0.4
//       }]
//     });
//   }

//   private generateBarChartData(users: User[]): void {
//     const monthly = new Map<string, number>();
//     users.forEach(u => {
//       const d = new Date(u.createdAt);
//       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
//       monthly.set(key, (monthly.get(key) || 0) + 1);
//     });

//     const sorted = Array.from(monthly.entries()).sort(([a], [b]) => a.localeCompare(b));

//     const labels = sorted.map(([key]) => {
//       const [y, m] = key.split('-');
//       return new Date(+y, +m - 1).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' });
//     });

//     const data = sorted.map(([, count]) => count);

//     this.usersPerMonthChart.set({
//       labels,
//       datasets: [{
//         label: 'הרשמות חדשות',
//         data,
//         backgroundColor: [
//           'rgba(102, 126, 234, 0.8)',
//           'rgba(118, 75, 162, 0.8)',
//           'rgba(255, 99, 132, 0.8)',
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(255, 205, 86, 0.8)',
//           'rgba(75, 192, 192, 0.8)'
//         ],
//         borderColor: [
//           '#667eea',
//           '#764ba2',
//           '#ff6384',
//           '#36a2eb',
//           '#ffcd56',
//           '#4bc0c0'
//         ],
//         borderWidth: 2
//       }]
//     });
//   }

//   onPeriodChange(): void {
//     this.generateChartData(); // סינון בעתיד
//   }

//   refreshData(): void {
//     this.loadData();
//   }

//   exportData(): void {
//     console.log('Exporting data...');
//     // ניתן להוסיף ייצוא ל־CSV, Excel וכו'
//   }
// }





import { Component, type OnInit, signal, computed, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatInputModule } from "@angular/material/input"
import { MatSnackBar } from "@angular/material/snack-bar"
import { FormsModule } from "@angular/forms"
import { BaseChartDirective } from "ng2-charts"
import { Chart, type ChartConfiguration, type ChartData, type ChartType, registerables } from "chart.js"
import { UserService } from "../../services/user.service"
import type { User } from "../../models/user/user.module"

// Register Chart.js components
Chart.register(...registerables)

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BaseChartDirective,
  ],
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  private userService = inject(UserService)
  private snackBar = inject(MatSnackBar)

  // Signals
  users = signal<User[]>([])
  isLoading = signal<boolean>(true)
  selectedPeriod = signal<string>("all")

  // Date of last data update
  lastUpdated = ""

  // Chart Data
  usersOverTimeChart = signal<ChartData<"line">>({ labels: [], datasets: [] })
  usersPerMonthChart = signal<ChartData<"bar">>({ labels: [], datasets: [] })

  // Chart Options
  lineChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { font: { family: "Roboto" } },
      },
      title: {
        display: true,
        text: "מגמת הרשמות משתמשים לאורך זמן",
        font: { size: 16, family: "Roboto" },
      },
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: "תאריך" },
      },
      y: {
        display: true,
        title: { display: true, text: "מספר משתמשים" },
        beginAtZero: true,
      },
    },
  }

  barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "הרשמות משתמשים לפי חודש",
        font: { size: 16, family: "Roboto" },
      },
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: "חודש" },
      },
      y: {
        display: true,
        title: { display: true, text: "מספר הרשמות" },
        beginAtZero: true,
      },
    },
  }

  // Chart Types
  lineChartType: ChartType = "line"
  barChartType: ChartType = "bar"

  // Computed Statistics
  totalUsers = computed(() => this.users().length)

  usersThisMonth = computed(() => {
    const now = new Date()
    return this.users().filter((user) => {
      const d = new Date(user.createdAt)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length
  })

  usersThisWeek = computed(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return this.users().filter((user) => new Date(user.createdAt) >= weekAgo).length
  })

  averageUsersPerMonth = computed(() => {
    const users = this.users()
    if (!users.length) return 0
    const months = new Map<string, number>()
    users.forEach((user) => {
      const d = new Date(user.createdAt)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      months.set(key, (months.get(key) || 0) + 1)
    })
    return Math.round(users.length / months.size)
  })

  ngOnInit(): void {
    this.loadData()
    this.updateLastUpdated()
  }

  // Update the 'lastUpdated' field
  updateLastUpdated(): void {
    this.lastUpdated = new Date().toLocaleString("he-IL")
  }

  loadData(): void {
    this.isLoading.set(true)
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data)
        this.generateChartData()
        this.updateLastUpdated()
        this.isLoading.set(false)
      },
      error: (error) => {
        console.error("Error loading users:", error)
        this.isLoading.set(false)
      },
    })
  }

  generateChartData(): void {
    const users = this.users()
    this.generateLineChartData(users)
    this.generateBarChartData(users)
  }

  private generateLineChartData(users: User[]): void {
    const sorted = [...users].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const daily = new Map<string, number>()
    let cumulative = 0

    sorted.forEach((u) => {
      const date = new Date(u.createdAt).toISOString().split("T")[0]
      daily.set(date, (daily.get(date) || 0) + 1)
    })

    const labels: string[] = []
    const data: number[] = []

    daily.forEach((count, date) => {
      cumulative += count
      labels.push(new Date(date).toLocaleDateString("he-IL"))
      data.push(cumulative)
    })

    this.usersOverTimeChart.set({
      labels,
      datasets: [
        {
          label: 'סה"כ משתמשים רשומים',
          data,
          borderColor: "#667eea",
          backgroundColor: "rgba(102, 126, 234, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    })
  }

  private generateBarChartData(users: User[]): void {
    const monthly = new Map<string, number>()
    users.forEach((u) => {
      const d = new Date(u.createdAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      monthly.set(key, (monthly.get(key) || 0) + 1)
    })

    const sorted = Array.from(monthly.entries()).sort(([a], [b]) => a.localeCompare(b))

    const labels = sorted.map(([key]) => {
      const [y, m] = key.split("-")
      return new Date(+y, +m - 1).toLocaleDateString("he-IL", { year: "numeric", month: "long" })
    })

    const data = sorted.map(([, count]) => count)

    this.usersPerMonthChart.set({
      labels,
      datasets: [
        {
          label: "הרשמות חדשות",
          data,
          backgroundColor: [
            "rgba(102, 126, 234, 0.8)",
            "rgba(118, 75, 162, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
          ],
          borderColor: ["#667eea", "#764ba2", "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
          borderWidth: 2,
        },
      ],
    })
  }

  onPeriodChange(): void {
    this.generateChartData() // סינון בעתיד
  }

  refreshData(): void {
    this.loadData()
  }

  exportData(): void {
    try {
      // נכין את הנתונים לייצוא
      const exportData = {
        exportDate: new Date().toISOString(),
        lastUpdated: this.lastUpdated,
        statistics: {
          totalUsers: this.totalUsers(),
          usersThisMonth: this.usersThisMonth(),
          usersThisWeek: this.usersThisWeek(),
          averageUsersPerMonth: this.averageUsersPerMonth(),
        },
        users: this.users(),
        chartData: {
          usersOverTime: this.usersOverTimeChart(),
          usersPerMonth: this.usersPerMonthChart(),
        },
      }

      // המרה ל-JSON
      const jsonString = JSON.stringify(exportData, null, 2)

      // יצירת קובץ להורדה
      const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" })
      const url = window.URL.createObjectURL(blob)

      // יצירת אלמנט להורדה
      const link = document.createElement("a")
      link.href = url
      link.download = `reports-export-${new Date().toISOString().split("T")[0]}.json`

      // הוספה לדף, לחיצה והסרה
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // ניקוי ה-URL
      window.URL.revokeObjectURL(url)

      console.log("Data exported successfully!")

      this.snackBar.open("הנתונים יוצאו בהצלחה! הקובץ נשמר במחשב שלך", "סגור", {
        duration: 4000,
        panelClass: "success-snackbar",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      this.snackBar.open("שגיאה בייצוא הנתונים", "סגור", {
        duration: 3000,
        panelClass: "error-snackbar",
      })
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
export class UserModule { }

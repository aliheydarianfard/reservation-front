import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse } from '../../features/auth/auth.service';

import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  nameid: string;       // userId
  unique_name: string;  // نام کاربر
  role: string;         // نقش
  exp: number;          // زمان انقضا
  iat: number;          // زمان ساخت
  [key: string]: any;   // برای فیلدهای اضافه
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'userId';
  constructor(@Inject(PLATFORM_ID) private platformId: Object){

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }
  
 login(response: LoginResponse): void {
  if (isPlatformBrowser(this.platformId)) {
    // کل ریسپانس رو ذخیره کن
    localStorage.setItem('auth', JSON.stringify(response));
    try {
      // توکن رو دیکد کن
      const decoded: DecodedToken = jwtDecode(response.token);

      // currentUser رو ذخیره کن
      localStorage.setItem('currentUser', JSON.stringify(decoded));
    } catch (e) {
      console.error('JWT Decode Error:', e);
    }
  }
}

 logout(): void {
  localStorage.removeItem('auth');
  localStorage.removeItem('currentUser');
  //todo call http
}
}

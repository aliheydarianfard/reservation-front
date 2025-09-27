import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { AuthService as CoreAuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

export interface LoginResponse {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  refreshTokenExpiresAt: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev.api.timedari.ir/api/Auth'; // پایه API

  constructor(
    private http: HttpClient,
    private coreAuth: CoreAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // درخواست OTP
  requestOtp(phoneNumber: string, deviceId: string, bypassUserCheck = true): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-otp`, { phoneNumber, bypassUserCheck, deviceId });
  }

  // ورود با OTP
  loginByCode(phoneNumber: string, code: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login-by-code`, { phoneNumber, code })
      .pipe(
        tap(res => this.saveUser(res))
      );
  }

  // ورود با پسورد
  loginByPassword(phoneNumber: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login-by-password`, { phoneNumber, password })
      .pipe(
        tap(res => this.saveUser(res))
      );
  }

  // ثبت‌نام
  registration(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration`, data);
  }

  // ذخیره token و user در Core AuthService
  private saveUser(res: LoginResponse): void {
    debugger
    console.log('Saving user in localStorage', res);
    if (!isPlatformServer(this.platformId)) {
      this.coreAuth.login(res.token, res.userId);
    }
  }

  // خروج
  logout(): void {
    this.coreAuth.logout();
  }

  // وضعیت ورود
  isLoggedIn(): boolean {
    return this.coreAuth.isLoggedIn();
  }

  // گرفتن کاربر فعلی
  getCurrentUser(): User | null {
    return this.coreAuth.getCurrentUser();
  }


}

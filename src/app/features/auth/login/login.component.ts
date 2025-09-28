import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  phoneNumber = '';
  code = '';
  password = '';
  useOtp = false; // true = ورود با کد، false = ورود با پسورد
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    const loginObs = this.useOtp
      ? this.auth.loginByCode(this.phoneNumber, this.code)
      : this.auth.loginByPassword(this.phoneNumber, this.password);

    loginObs.subscribe({
      next: () => {
        // بعد از login کاربر به خانه هدایت شود
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = this.useOtp ? 'کد OTP نامعتبر' : 'رمز عبور نامعتبر';
        console.error(err);
      },
    });
  }

  requestOtp() {
    const deviceId = 'browser-' + Math.random().toString(36).substr(2, 9);
    this.auth.requestOtp(this.phoneNumber, deviceId).subscribe({
      next: (res) => {
        this.code = res.code;
        alert('کد OTP ارسال شد!');
      },
      error: (err) => {
        alert('خطا در ارسال OTP');
        console.error(err);
      },
    });
  }
}

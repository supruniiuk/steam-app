import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  isSubmited: boolean;

  constructor(public authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/games']);
    }
  }

  login() {
    this.isSubmited = false;
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(user).subscribe((res) => {
      this.isSubmited = true;
      this.loginForm.reset();
      this.router.navigate(['/games']);
    });
  }

  public registration() {
    this.isSubmited = false;
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.registration(user).subscribe(
      (res) => {},
      (err) => {
        this.loginForm.controls['password'].setValue('');
      },
      () => {
        this.isSubmited = true;
        this.loginForm.reset();
        this.router.navigate(['/games']);
      }
    );
  }

  isBtnDisabled() {
    return this.loginForm.invalid || this.isSubmited;
  }
}

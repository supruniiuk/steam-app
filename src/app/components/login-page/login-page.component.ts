import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    console.log(this.user);
    this.authService.login(this.user).subscribe(
      (res) => {
        console.log('res');
      },
      (err: Error) => {
        console.log(err);
      },
      () => {
        console.log('done');
      }
    );
    this.loginForm.reset();
  }
}

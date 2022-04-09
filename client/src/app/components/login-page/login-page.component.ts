import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../../../scss/_profile-form.scss']
})
export class LoginPageComponent implements OnInit {
  subs: Subscription[] = [];
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

    const errorSubscription = this.authService.error$.subscribe({
      next: (v) => this.loginForm.controls['password'].setValue(''),
    });
    this.subs.push(errorSubscription);
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

    const loginSubsriber = this.authService.login(user).subscribe(() => {
      this.isSubmited = true;
      this.loginForm.reset();
      this.router.navigate(['/games']);
    });
    this.subs.push(loginSubsriber);
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

    const registrationSubscriber = this.authService
      .registration(user)
      .subscribe(() => {
        this.isSubmited = true;
        this.loginForm.reset();
        this.router.navigate(['/games']);
      });
    this.subs.push(registrationSubscriber);
  }

  isBtnDisabled() : boolean {
    return this.loginForm.invalid || this.isSubmited;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

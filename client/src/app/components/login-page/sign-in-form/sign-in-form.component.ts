import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnInit {
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

    const loginSubscriber = this.authService.login(user).subscribe(() => {
      this.isSubmited = true;
      this.loginForm.reset();
      this.router.navigate(['/games']);
    });
    this.subs.push(loginSubscriber);
  }

  isBtnDisabled(): boolean {
    return this.loginForm.invalid || this.isSubmited;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

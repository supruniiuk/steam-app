import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { RequestService } from 'src/app/core/services/requests.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnInit {
  subs: Subscription[] = [];
  public loginForm: FormGroup;
  isSubmited: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private requestService: RequestService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const errorSubscription = this.requestService.error$.subscribe({
      next: (v) => this.loginForm.controls['password'].setValue(''),
    });
    this.subs.push(errorSubscription);
  }

  login(): void {
    this.isSubmited = false;
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const loginSub = this.authService.login(user).subscribe(() => {
      this.isSubmited = true;
      this.loginForm.reset();
      this.router.navigate(['/games']);
      window.location.reload(); //temp
    });
    this.subs.push(loginSub);
  }

  isBtnDisabled(): boolean {
    return this.loginForm.invalid || this.isSubmited;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RequestService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit {
  subs: Subscription[] = [];
  public registrationForm: FormGroup;
  isSubmited: boolean;

  constructor(
    public authService: AuthService,
    private requestService: RequestService
  ) {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      role: new FormControl('gamer', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const errorSubscription = this.requestService.error$.subscribe({
      next: (v) => this.registrationForm.controls['password'].setValue(''),
    });
    this.subs.push(errorSubscription);
  }

  public registration() {
    this.isSubmited = false;
    if (this.registrationForm.invalid) {
      return;
    }

    const user = this.registrationForm.value;
    user.username = user.username.trim();
    user.birthday = new Date(user.birthday).toISOString();

    const registrationSubscriber = this.authService
      .registration(user)
      .subscribe(() => {
        this.isSubmited = true;
        this.registrationForm.reset();
      });
    this.subs.push(registrationSubscriber);
  }

  isBtnDisabled(): boolean {
    return this.registrationForm.invalid || this.isSubmited;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

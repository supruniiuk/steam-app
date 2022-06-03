import {
  TestBed,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { Location } from '@angular/common';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EMPTY, of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let authService: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    component = new LoginPageComponent(authService, router);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should mark email as invalid if empty value', () => {
    const control = component.loginForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should mark password as invalid if empty value', () => {
    const control = component.loginForm.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should mark password as invalid if value is less than 6 symbols', () => {
    const control = component.loginForm.get('password');
    control.setValue('code');
    expect(control.valid).toBeFalsy();
  });

  it('should call authService when user signs up', () => {
    const spy = spyOn(authService, 'registration').and.callFake(() => {
      return EMPTY;
    });

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password',
    });

    component.registration();

    expect(spy).toHaveBeenCalled();
  });

  it('should call authService when user sings in', () => {
    const spy = spyOn(authService, 'login').and.callFake(() => {
      return EMPTY;
    });

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password',
    });

    component.login();

    expect(spy).toHaveBeenCalled();
  });
});

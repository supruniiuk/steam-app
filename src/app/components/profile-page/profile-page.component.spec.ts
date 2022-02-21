import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    const info = {
      age: 50,
      email: 'example@gmail.com',
      friendsList: [],
      gamesList: [],
      username: 'name',
      id: '-id',
    };
    userService = TestBed.inject(UserService);
    component = new ProfilePageComponent(userService);
    localStorage.setItem('userInfo', JSON.stringify(info));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create updating form', () => {
    expect(component.profileForm.contains('username')).toBeTruthy();
    expect(component.profileForm.contains('age')).toBeTruthy();
    expect(component.profileForm.contains('email')).toBeTruthy();
  });

  it('should call userService when user updates info', () => {
    const spy = spyOn(userService, 'updateUser').and.callFake(() => {
      return EMPTY;
    });

    component.profileForm.patchValue({
      email: 'test@example.com',
      age: 34,
      username: 'test',
    });

    component.save();
    expect(spy).toHaveBeenCalled();
  });
});

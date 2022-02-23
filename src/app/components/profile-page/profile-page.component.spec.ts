import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let userService: UserService;
  let component: ProfilePageComponent;
  let info: User = {
    age: 50,
    email: 'exmple@gmail.com',
    friendsList: [],
    gamesList: [],
    id: '-MwDFeGzNW8gbGRQicfQ',
    username: 'test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    component = new ProfilePageComponent(userService);
    spyOn(userService, 'getCurrentUserInfo').and.callFake(() => {
      return info;
    });
    component.ngOnInit();
  });

  it('should be created', () => {
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

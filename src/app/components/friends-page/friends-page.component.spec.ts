import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from 'src/app/shared/services/games.service';
import { UserService } from 'src/app/shared/services/user.service';

import { FriendsPageComponent } from './friends-page.component';

describe('FriendsPageComponent', () => {
  let component: FriendsPageComponent;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    component = new FriendsPageComponent(userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

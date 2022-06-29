import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { FriendItemComponent } from './friend-item.component';

describe('FriendItemComponent', () => {
  let component: FriendItemComponent;
  let userService: UserService;
  let info: User = {
    age: 50,
    email: 'exmple@gmail.com',
    friendsList: [
      { email: 'bcd@gmail.com', id: '-MwDEvoJA0MuEMAwUPLu' },
      { email: 'ijkl@gmail.com', id: '-MwDFYPchUDxdD9rcHze' },
    ],
    gamesList: [{ id: 'id1' }],
    id: '-MwDFeGzNW8gbGRQicfQ',
    username: 'test',
  };
  let newFriend = { id: '-MwDErAZp7iK98goW2PU', email: 'abc@gmail.com' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendItemComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    component = new FriendItemComponent(userService);

    spyOn(userService, 'getCurrentUserInfo').and.callFake(() => {
      return info;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateUser when adding friend', () => {
    component.friend = newFriend;

    component.ngOnInit();
    const spy = spyOn(userService, 'updateUser').and.callFake(() => {
      return EMPTY;
    });

    component.add();
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateUser when remove friend', () => {
    component.friend = newFriend;

    component.ngOnInit();
    const spy = spyOn(userService, 'updateUser').and.callFake(() => {
      return EMPTY;
    });

    component.remove();
    expect(spy).toHaveBeenCalled();
  });
});

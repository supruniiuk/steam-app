import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';

import { FriendsPageComponent } from './friends-page.component';

describe('FriendsPageComponent', () => {
  let component: FriendsPageComponent;
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

    spyOn(userService, 'getCurrentUserInfo').and.callFake(() => {
      return info;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls getAllUsers when ngOnInit', () => {
    const spy = spyOn(userService, 'getAllUsers').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('remove friend', () => {
    let exFriend = { id: '-MwDErAZp7iK98goW2PU', email: 'abc@gmail.com' };
    let friends = [
      { email: 'bcd@gmail.com', id: '-MwDEvoJA0MuEMAwUPLu' },
      { email: 'ijkl@gmail.com', id: '-MwDFYPchUDxdD9rcHze' },
    ];
    component.ngOnInit()
    component.remove(exFriend);
    expect(component.friendsList.length).toEqual(friends.length);
  });

  it('add friend', () => {
    let newFriend = { id: '-MwDErAZp7iK98goW2PU', email: 'abc@gmail.com' };
    let friends = [
      { id: '-MwDErAZp7iK98goW2PU', email: 'abc@gmail.com' },
      { email: 'bcd@gmail.com', id: '-MwDEvoJA0MuEMAwUPLu' },
      { email: 'ijkl@gmail.com', id: '-MwDFYPchUDxdD9rcHze' },
    ];
    component.ngOnInit()
    component.add(newFriend);
    expect(component.friendsList.length).toEqual(friends.length);
  });
});

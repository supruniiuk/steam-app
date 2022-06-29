import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { GameItemComponent } from './game-item.component';

describe('GameItemComponent', () => {
  let component: GameItemComponent;
  let userService: UserService;
  let newGame = {
    description: 'description3',
    id: 'id3',
    price: 150,
    tag: ['adventure'],
    title: 'title3',
  };
  let existingGame = {
    description: 'description1',
    id: 'id1',
    price: 150,
    tag: ['adventure'],
    title: 'title1',
  };
  let info: User = {
    age: 50,
    email: 'exmple@gmail.com',
    friendsList: [],
    gamesList: ['id1'],
    id: '-MwDFeGzNW8gbGRQicfQ',
    username: 'test',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameItemComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    component = new GameItemComponent(userService);
    spyOn(userService, 'getCurrentUserInfo').and.callFake(() => {
      return info;
    });
    spyOn(userService, 'setCurrentUserInfo').and.callFake(() => {
      return EMPTY;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateUser when saving game', () => {
    component.game = newGame;

    component.ngOnInit();
    const spy = spyOn(userService, 'updateUser').and.callFake(() => {
      return EMPTY;
    });

    component.addGame();
    expect(spy).toHaveBeenCalled();
  });

  it('shouldn`t add game if user saved it', () => {
    component.game = existingGame;

    component.ngOnInit();
    const spy = spyOn(userService, 'updateUser').and.callFake(() => {
      return EMPTY;
    });

    component.addGame();
    expect(component.isSubmitted).toBeTruthy();
  });
});

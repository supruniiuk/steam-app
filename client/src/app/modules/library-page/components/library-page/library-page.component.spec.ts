import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/core/services/games.service';
import { UserService } from 'src/app/core/services/user.service';

import { LibraryPageComponent } from './library-page.component';

describe('LibraryPageComponent', () => {
  let component: LibraryPageComponent;
  let gameService: GameService;
  let userService: UserService;
  let info: User = {
    age: 50,
    email: 'exmple@gmail.com',
    friendsList: [],
    gamesList: [{ id: 'id1' }],
    id: '-MwDFeGzNW8gbGRQicfQ',
    username: 'test',
  };
  const games = [
    {
      description: 'description1',
      id: 'id1',
      price: 150,
      tag: ['adventure'],
      title: 'title1',
    },
    {
      description: 'description2',
      id: 'id2',
      price: 50,
      tag: ['indie'],
      title: 'title2',
    },
    {
      description: 'description3',
      id: 'id3',
      price: 100,
      tag: ['action'],
      title: 'title3',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    gameService = TestBed.inject(GameService);
    component = new LibraryPageComponent(gameService, userService);
    spyOn(userService, 'getCurrentUserInfo').and.callFake(() => {
      return info;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllGames when ngOnInit', () => {
    const spy = spyOn(gameService, 'getAllGames').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter games', () => {
    component.ngOnInit();
    component.allGames = games;
    component.filterGames();
    expect(component.gamesList).toEqual([games[0]]);
  });
});

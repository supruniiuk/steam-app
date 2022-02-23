import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { GameService } from 'src/app/shared/services/games.service';

import { GamesPageComponent } from './games-page.component';

describe('GamesPageComponent', () => {
  let component: GamesPageComponent;
  let gameService: GameService;
  let games = [
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
    {
      description: 'description4',
      id: 'id4',
      price: 760,
      tag: ['adventure'],
      title: 'title4',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    gameService = TestBed.inject(GameService);
    component = new GamesPageComponent(gameService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls getAllGames when ngOnInit', () => {
    const spy = spyOn(gameService, 'getAllGames').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('setting price range for filter', () => {
    component.games = games;
    component.setPricesRange();
    expect(component.priceRange.min).toBe(50);
    expect(component.priceRange.max).toBe(760);
  });
});

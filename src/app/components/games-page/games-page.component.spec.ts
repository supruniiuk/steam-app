import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from 'src/app/shared/services/games.service';

import { GamesPageComponent } from './games-page.component';

describe('GamesPageComponent', () => {
  let component: GamesPageComponent;
  let gameService: GameService;

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
});

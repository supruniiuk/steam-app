import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from 'src/app/shared/services/games.service';
import { UserService } from 'src/app/shared/services/user.service';

import { LibraryPageComponent } from './library-page.component';

describe('LibraryPageComponent', () => {
  let component: LibraryPageComponent;
  let gameService: GameService;
  let userService: UserService;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

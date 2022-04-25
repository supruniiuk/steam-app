import {
  Component,
  ElementRef,
  OnInit,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/shared/services/games.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
})
export class UpdateGameComponent implements OnInit {
  game: FormGroup;
  subs: Subscription[] = [];
  isSubmited: boolean;
  possibleTagOptions: string[] = ['indie', 'action', 'adventure'];

  @ViewChildren('tag') tags: QueryList<ElementRef>;
  @Input() editGame: Game;
  @Output() updatedGame = new EventEmitter<Game>();
  @Output() close = new EventEmitter();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.game = new FormGroup({
      title: new FormControl(this.editGame.title, [Validators.required]),
      price: new FormControl(this.editGame.price, [Validators.required]),
      description: new FormControl(this.editGame.description, [
        Validators.required,
      ]),
      tags: new FormControl([]),
    });
  }

  getCheckedTags() {
    const tags = this.tags.toArray().filter((t) => t.nativeElement.checked);
    return tags.map((tag) => tag.nativeElement.value);
  }

  update(): void {
    this.isSubmited = true;
    this.game.value.tags = this.getCheckedTags();
    const updatedGame = { ...this.editGame, ...this.game.value };

    const updateGame = this.gameService
      .updateGame(updatedGame, this.editGame.id)
      .subscribe(() => {
        this.updatedGame.emit(this.game.value);
        this.isSubmited = false;
      });

    this.subs.push(updateGame);
  }

  isBtnDisabled(): boolean {
    return this.game.invalid || this.isSubmited;
  }

  closeWindow() {
    this.close.emit();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

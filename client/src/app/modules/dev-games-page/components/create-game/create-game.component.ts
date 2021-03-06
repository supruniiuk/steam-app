import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/shared/interfaces';
import { GameService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
})
export class CreateGameComponent implements OnInit {
  game: FormGroup;
  subs: Subscription[] = [];
  isSubmited: boolean;
  possibleTagOptions: string[] = ['indie', 'action', 'adventure'];

  @ViewChildren('tag') checked: QueryList<ElementRef>;
  @Output() newGame = new EventEmitter<Game>();

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.game = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tags: new FormControl([]),
    });
  }

  getCheckedTags() {
    const tags = this.checked.toArray().filter((t) => t.nativeElement.checked);
    return tags.map((tag) => tag.nativeElement.value);
  }

  resetForm() {
    this.game.reset();
    this.checked.forEach((box) => (box.nativeElement.checked = false));
  }

  create(): void {
    this.isSubmited = true;
    this.game.value.tags = this.getCheckedTags();
    const newGame = this.game.value;
    const createGame = this.gameService.createGame(newGame).subscribe(() => {
      this.newGame.emit(this.game.value);
      this.resetForm();
    });
    this.isSubmited = false;
    this.subs.push(createGame);
  }

  isBtnDisabled(): boolean {
    return this.game.invalid || this.isSubmited;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

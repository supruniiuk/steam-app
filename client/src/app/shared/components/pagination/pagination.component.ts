import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  current: number = 1;

  @Output() nextPage: EventEmitter<number> = new EventEmitter<number>();
  @Input() pages: number;

  constructor() {}

  ngOnInit(): void {}

  changePage(page: number) {
    this.nextPage.emit(page);
    this.current = page;
  }
}

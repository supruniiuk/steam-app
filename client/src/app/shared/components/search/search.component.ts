import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  srcStr: string = '';

  @Output() search = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  emitSearch() {
    this.search.emit(this.srcStr);
  }
}

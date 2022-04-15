import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/requests.service';

@Component({
  selector: 'app-allert',
  templateUrl: './allert.component.html',
})
export class AllertComponent implements OnInit {
  constructor(
    public requestService: RequestService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
}

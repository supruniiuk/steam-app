import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isAuth: boolean = false;

  @ViewChild('menu', { static: false }) nav: ElementRef;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  showMenu() {
    const element = this.nav.nativeElement;
    if (element.classList.length == 2) {
      element.classList = ['menu'];
    } else {
      element.classList = ['collapse navbar-collapse'];
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import logo from '../../shared/svg/logo.js';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  logo: SafeHtml;
  navLinks: Array<{ title: string; path: string }> = [
    { title: 'Games', path: '/games' },
    { title: 'Library', path: '/library' },
    { title: 'Friends', path: '/friends' },
    { title: 'Profile', path: '/profile' },
  ];

  @ViewChild('menu', { static: false }) nav: ElementRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.logo = this.sanitizer.bypassSecurityTrustHtml(logo);
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

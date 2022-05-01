import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import logo from '../../shared/svg/logo.js';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  logo: SafeHtml;
  navLinks: Array<{ title: string; path: string; show: boolean }> = [];
  @ViewChild('menu', { static: false }) nav: ElementRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    if (authService.isAuthenticated()) {
      let userRole = authService.getUserRole();
      this.navLinks = [
        { title: 'Games', path: '/games', show: true },
        {
          title: 'Library',
          path: '/library',
          show: userRole === 'gamer',
        },
        {
          title: 'Friends',
          path: '/friends',
          show: userRole !== 'admin',
        },
        { title: 'Profile', path: '/profile', show: true },
        {
          title: 'My games',
          path: '/dev-games',
          show: userRole === 'developer',
        },
        {
          title: 'New games',
          path: '/new',
          show: userRole === 'admin',
        },
      ];
    }
  }

  ngOnInit(): void {
    this.logo = this.sanitizer.bypassSecurityTrustHtml(logo);
  }

  logout() {
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

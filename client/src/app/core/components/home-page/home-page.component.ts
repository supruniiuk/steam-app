import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import logo from '../../../shared/svg/logo.js';
import { navigationLinks } from 'src/app/shared/constants/routes.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  logo: SafeHtml;
  navLinks: Array<{ title: string; path: string; roles: string[] }> = [];
  userRole: string;
  @ViewChild('menu', { static: false }) nav: ElementRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.navLinks = navigationLinks;
    this.logo = this.sanitizer.bypassSecurityTrustHtml(logo);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showMenu() {
    const element = this.nav.nativeElement;
    if (element.classList.length == 2) {
      element.classList = ['menu'];
    } else {
      element.classList = ['collapse navbar-collapse'];
    }
  }

  showLink(roles: string[]) {
    return roles.includes(this.userRole);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }
}

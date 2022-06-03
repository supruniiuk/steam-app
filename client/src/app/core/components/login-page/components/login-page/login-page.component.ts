import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../../../../../../scss/_profile-form.scss'],
})
export class LoginPageComponent implements OnInit {
  isLogin: boolean = true;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/games']);
    }
  }
}

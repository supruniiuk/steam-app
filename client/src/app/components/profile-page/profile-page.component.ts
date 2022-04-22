import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/newInterfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['../../../scss/_profile-form.scss'],
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  isSubmited: boolean;
  saved: boolean = false;
  subs: Subscription[] = [];
  deleteProfile: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = AuthService.getTokenInfo();

    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username, Validators.required),
      birthday: new FormControl(this.user.birthday.split('T')[0], [
        Validators.required,
      ]),
    });
  }

  save() {
    this.isSubmited = false;
    if (this.profileForm.invalid) {
      return;
    }
    const formData = this.profileForm.value;

    const userUpdated = {
      email: formData.email,
      username: formData.username.trim(),
      birthday: new Date(formData.birthday).toISOString(),
    };

    const updateSub = this.userService
      .updateUser(userUpdated, this.user.id)
      .subscribe(() => {
        this.isSubmited = true;
        this.user = { ...this.user, ...formData };
        this.authService.setUserInfo(this.user);
      });

    this.subs.push(updateSub);
  }

  deleteUserProfile(confirm: boolean): void {
    this.deleteProfile = false;
    if (confirm) {
      const deleteSub = this.userService.deleteProfile().subscribe(() => {
        this.authService.logout();
      });

      this.subs.push(deleteSub);
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

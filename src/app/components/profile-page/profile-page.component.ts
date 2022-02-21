import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  isSubmited: boolean;
  saved: boolean = false;

  errorMessage: string = '';

  constructor(private userService: UserService) {
    this.user = this.userService.getCurrentUserInfo();

    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email),
      username: new FormControl(
        this.user.username ? this.user.username : '',
        Validators.required
      ),
      age: new FormControl(
        this.user.age ? this.user.age : '',
        Validators.required
      ),
    });
  }

  ngOnInit(): void {}

  save() {
    this.isSubmited = false;
    if (this.profileForm.invalid) {
      return;
    }

    this.userService.updateUser(this.profileForm.value, this.user.id).subscribe(
      (res: User) => {
        this.isSubmited = true;
        let updatedUser = { ...this.user, ...res };

        this.userService.setCurrentUserInfo(updatedUser);
        this.showAlert();
      },
      (err: Error) => {
        this.errorMessage = err.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  showAlert() {
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 2000);
  }
}

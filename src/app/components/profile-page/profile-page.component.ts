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

  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userInfo: string | null = localStorage.getItem('userInfo');
    this.user = JSON.parse(userInfo ? userInfo : '');

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

  save() {
    this.isSubmited = false;
    if (this.profileForm.invalid) {
      return;
    }

    this.userService.updateUser(this.profileForm.value, this.user.id).subscribe(
      (res: User) => {
        this.isSubmited = true;
        let updatedUser = { ...this.user, ...res };
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      },
      (err: Error) => {
        this.errorMessage = err.message;
      }
    );
  }
}

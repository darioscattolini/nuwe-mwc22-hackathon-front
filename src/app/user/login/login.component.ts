import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'mwc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = '';
  public invalidLogin = false;
  public password: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  logIn() {
    console.log(this.email + this.password);
    const isValid = this.userService.logIn(this.email, this.password);

    if (isValid) {
      this.router.navigate(['']);
    } else {
      this.invalidLogin = true;
    }
  }
}

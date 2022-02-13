import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * Creates Login component
 */
@Component({
  selector: 'mwc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Stores email input value
   */
  public email: string = '';
  
  /**
   * Signals if login was invalid (wrong email or password)
   */
  public invalidLogin = false;

  /**
   * Stores password input value
   */
  public password: string = '';

  /**
   * Creates Login component
   * @param {Router} router - Router dependency
   * @param {UserService} userService - UserService dependency
   */
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  /**
   * Attempts user login with values of email and password inputs
   */
  logIn() {
    const isValid = this.userService.logIn(this.email, this.password);

    if (isValid) {
      this.router.navigate(['']);
    } else {
      this.invalidLogin = true;
    }
  }
}

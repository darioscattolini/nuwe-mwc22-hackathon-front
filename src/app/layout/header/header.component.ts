import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';

/**
 * Creates Header component
 */
@Component({
  selector: 'mwc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Returns logged user
   */
  public get loggedUser() {
    return this.userService.loggedUser;
  }

  /**
   * Creates Header component
   * @param {Router} router - Router dependency
   * @param {UserService} userService - UserService dependency
   */
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  /**
   * Logs out the current user
   */
  public logOut(): void {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}

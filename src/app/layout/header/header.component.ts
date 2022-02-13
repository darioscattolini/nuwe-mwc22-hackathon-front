import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'mwc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public get loggedUser() {
    return this.userService.loggedUser;
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public logOut(): void {
    this.userService.logOut();
    this.router.navigate(['']);
  }
}

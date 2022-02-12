import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'mwc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedUser?: User;

  constructor(
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.loggedUser = this.userService.loggedUser;
    }
  }
}

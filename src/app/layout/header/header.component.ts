import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'mwc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isUserLogged?: User;

  constructor() { }

}

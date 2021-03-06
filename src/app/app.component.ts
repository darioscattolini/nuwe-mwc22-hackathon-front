import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, angleIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, angleIcon);

@Component({
  selector: 'mwc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }

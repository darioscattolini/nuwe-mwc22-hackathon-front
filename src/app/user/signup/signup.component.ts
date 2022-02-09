import { Component } from '@angular/core';
import { Router } from '@angular/router';

type PersonalData = {
  name: string;
  email: string;
  description: string;
  country: string;
  city: string;
};

@Component({
  selector: 'mwc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public avatarChosen = false;

  public personalData: PersonalData = {
    name: '',
    email: '',
    description: '',
    country: '',
    city: ''
  };

  public personalDataValid = false;

  public requiredMessage = 'This field cannot be empty';

  constructor(private router: Router) { }

  public cancel() {
    this.router.navigate(['']);
  }
}

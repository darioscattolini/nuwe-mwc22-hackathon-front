import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'mwc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public isAvatarSaved = false;
  public isPersonalDataSaved = false;

  public personalDataForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  public requiredMessage = 'This field cannot be empty';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  public cancel() {
    this.router.navigate(['']);
  }

  public submitPersonalData() {
    const data: User['personalData'] = this.personalDataForm.value;
    this.isPersonalDataSaved = this.userService.submitPersonalData(data);
  }
}

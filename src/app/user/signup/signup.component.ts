import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { CountriesService } from '../services/countries.service';
import { UserService } from '../services/user.service';
import { CountryData } from '../models/country-data';

@Component({
  selector: 'mwc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public get avatarSrc() {
    return `https://avatars.dicebear.com/api/human/${this.avatarSeed}.svg`;
  }

  public countries?: CountryData[];

  public personalDataForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  public requiredMessage = 'This field cannot be empty';

  private avatarSeed = this.generateRandomSeed();

  @ViewChild('wizard') wizard!: ClrWizard;

  constructor(
    private router: Router,
    private countriesService: CountriesService,
    private userService: UserService
  ) { }

  public cancel(): void {
    this.router.navigate(['']);
  }

  public generateAvatar(): void {
    this.avatarSeed = this.generateRandomSeed();
  }

  public ngOnInit(): void {
    this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  public async checkEmail(): Promise<void> {
    const email = this.personalDataForm.controls['email'].value;
    const isValidEmail = await this.userService.checkEmail(email);

    if (isValidEmail) {
      this.wizard.next();
    } else {
      this.personalDataForm.controls['email']
        .setErrors({ invalidEmail: true });
    }
  }

  private generateRandomSeed(): number {
    return Math.random() * 1000000000;
  }
}

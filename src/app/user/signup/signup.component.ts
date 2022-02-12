import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
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

  private avatarSeed = this.generateRandomSeed();

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

  public submitAvatar(): void {
    this.isAvatarSaved = this.userService.submitAvatar(this.avatarSeed);
  }

  public submitPersonalData(): void {
    const data: User['personalData'] = this.personalDataForm.value;
    this.isPersonalDataSaved = this.userService.submitPersonalData(data);
  }

  private generateRandomSeed(): number {
    return Math.random() * 1000000000;
  }
}

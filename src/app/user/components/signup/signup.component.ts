import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { take } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';
import { CountryData } from '../../models/country-data';
import { User } from '../../models/user';

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

  public hasSignUpFailed = false;

  public personalDataForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  public professionalDataForm = new FormGroup({
    yearsOfExperience: new FormControl('', [
      Validators.required, Validators.min(0)
    ]),
    sector: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required)
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
    this.toggleNextStepDisabled();
    this.wizard.currentPage.nextStepDisabled = true;

    const emailControl = this.personalDataForm.controls['email'];
    const isValidEmail = await this.userService.checkEmail(emailControl.value);

    if (isValidEmail) {
      this.toggleNextStepDisabled();
      this.wizard.next();
    } else {
      emailControl.setErrors({ invalidEmail: true });
      emailControl.valueChanges
        .pipe(take(1))
        .subscribe(() => { this.toggleNextStepDisabled(); });
    }
  }

  public async submit() {
    this.toggleNextStepDisabled();
    this.hasSignUpFailed = false;
    const personalData = this.personalDataForm.controls;
    const professionalData = this.professionalDataForm.controls;

    const user = new User(
      {
        fullName: personalData['fullName'].value,
        email: personalData['email'].value,
        description: personalData['description'].value,
        country: personalData['country'].value,
        city: personalData['city'].value
      },
      String(this.avatarSeed),
      {
        yearsOfExperience: Number(professionalData['yearsOfExperience'].value),
        sector: professionalData['sector'].value,
        skills: professionalData['skills'].value.split(',')
      }
    );

    const submitted = await this.userService.signUp(user);

    if (submitted) {
      this.wizard.finish();
      this.router.navigate(['']);
    } else {
      this.hasSignUpFailed = true;
      this.toggleNextStepDisabled();
    }
  }

  private generateRandomSeed(): number {
    return Math.random() * 1000000000;
  }

  private toggleNextStepDisabled(): void {
    const currentPage = this.wizard.currentPage;
    currentPage.nextStepDisabled = !currentPage.nextStepDisabled;
  }
}
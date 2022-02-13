import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { take } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';
import { CountryData } from '../../models/country-data';
import { User } from '../../models/user';

/**
 * Creates Signup component
 */
@Component({
  selector: 'mwc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public get avatarSrc() {
    return `https://avatars.dicebear.com/api/human/${this.avatarSeed}.svg`;
  }

  /**
   * Full list of country names and codes to populate options in country select
   * field in form
   */
  public countries!: CountryData[];

  /**
   * Signals if sign up has failed
   */
  public hasSignUpFailed = false;

  /**
   * Angular FormGroup containing controls for personal data form fields
   */
  public personalDataForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  /**
   * Angular FormGroup containing controls for professional data form fields
   */
  public professionalDataForm = new FormGroup({
    yearsOfExperience: new FormControl('', [
      Validators.required, Validators.min(0)
    ]),
    sector: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required)
  });

  /**
   * Message to be displayed for every form field where required validator fails
   */
  public requiredMessage = 'This field cannot be empty';

  /**
   * Currently selected avatar seed
   */
  private avatarSeed = this.generateRandomSeed();

  /**
   * Referece to the Clarity wizard component
   */
  @ViewChild('wizard') wizard!: ClrWizard;

  /**
   * Creates Signup component
   * @param {Router} router - Router dependency
   * @param {CountriesService} countriesService - CountriesService dependency
   * @param {UserService} userService - UserService dependency
   */
  constructor(
    private router: Router,
    private countriesService: CountriesService,
    private userService: UserService
  ) { }

  /**
   * Executed if Sign Up Wizard is cancelled. Triggers navigation to home page.
   */
  public cancel(): void {
    this.router.navigate(['']);
  }

  /**
   * Generates and stores a new avatar seed.
   */
  public generateAvatar(): void {
    this.avatarSeed = this.generateRandomSeed();
  }

  /**
   * Angular component life-cycle hook. Used here to retrieve list of countries
   * to populate country select field in form.
   */
  public ngOnInit(): void {
    this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  /**
   * Checks if email used for sign up is not already in use
   */
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

  /**
   * Submits sign up form after Wizard is completed
   */
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

  /**
   * Generates a random 9-digit number
   * @returns number
   */
  private generateRandomSeed(): number {
    return Math.random() * 1000000000;
  }

  /**
   * Enables/disables the "next"/"finish" button of Wizard's current page
   */
  private toggleNextStepDisabled(): void {
    const currentPage = this.wizard.currentPage;
    currentPage.nextStepDisabled = !currentPage.nextStepDisabled;
  }
}

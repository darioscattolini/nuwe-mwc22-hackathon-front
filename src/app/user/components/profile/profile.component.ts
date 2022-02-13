import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';

/**
 * Creates Profile component
 */
@Component({
  selector: 'mwc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /**
   * Full name of user's country
   */
  public country!: string;

  /**
   * Displayable name of user's professional sector
   */
  public get sector() {
    switch(this.user.professionalData.sector) {
      case 'back-end':
        return 'Back-End';
      case 'data-science':
        return 'Data Science';
      case 'front-end':
        return 'Front-End';
    }
  }

  /**
   * Currently logged user
   */
  public get user() {
    return this.userService.loggedUser!;
  }

  /**
   * Creates Profile component
   * @param {CountriesService} countriesService - CountriesService dependency
   * @param {UserService} userService - UserService dependency
   */
  constructor(
    private countriesService: CountriesService,
    private userService: UserService
  ) { }

  /**
   * Angular component life-cycle hook. Used here to retrieve full name of 
   * user's country right after component is created.
   */
  public ngOnInit(): void {
    this.countriesService.getCountryName(this.user.personalData.country)
      .subscribe(country => {
        this.country = country;
      });
  }
}

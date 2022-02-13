import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'mwc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public country!: string;

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

  public get user() {
    return this.userService.loggedUser!;
  }

  constructor(
    private countriesService: CountriesService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.countriesService.getCountryName(this.user.personalData.country)
      .subscribe(country => {
        this.country = country;
      });
  }
}

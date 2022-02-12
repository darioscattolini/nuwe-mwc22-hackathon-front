import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedUser?: User;

  constructor(
    private http: HttpClient
  ) {}

  public logIn(email: string, password: string) {
    // here one should make Http call with email and password and get user data
    // this.http...
    const userData = {
      personalData: {
        fullName: 'Darío Scattolini',
        email: 'dario.scattolini@example.com',
        description: 'Front-end developer based in Barcelona',
        country: 'ESP',
        city: 'Barcelona'
      },
      avatarSeed: '123456789'
    };

    if (userData) {
      this.loggedUser = new User(userData.personalData, userData.avatarSeed);
      return true;
    } else {
      return false;
    }
  }

  public submitPersonalData(data: User['personalData']) {
    // here one should make Http call submitting personal data, returning if data
    // could be saved or not
    // this.http...
    const valid = false;

    return valid;
  }

  public submitAvatar(seed: number) {
    // here one should make Http call submitting avatar seed, returning if seed
    // could be saved or not
    // this.http...
    const valid = true;

    return valid;
  }
}

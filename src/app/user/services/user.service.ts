import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

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
    // below is simulated response
    const userData = {
      personalData: {
        fullName: 'Darío Scattolini',
        email: 'dario.scattolini@example.com',
        description: 'Front-end developer based in Barcelona',
        country: 'ESP',
        city: 'Barcelona'
      },
      avatarSeed: '123456789',
      professionalData: {
        yearsOfExperience: 2,
        sector: 'front-end' as User['professionalData']['sector'],
        skills: ['Angular', 'CSS', 'HTML']
      }
    };

    if (userData) {
      this.loggedUser = new User(
        userData.personalData, userData.avatarSeed, userData.professionalData
      );
      return true;
    } else {
      return false;
    }
  }

  public async checkEmail(email: string) {
    // http call to check if email is free and have it reserved for this sign up
    // this.http...
    // below is simulated response
    const valid = true;

    // simulate async response
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    return valid!;
  }

  public logOut() {
    // http call to log out from server

    this.loggedUser = undefined;
  }

  public async signUp(user: User) {
    const userJson = JSON.stringify(user);

    // http call sending user data for sign up  
    // below is simulated response
    const valid = true;

    // simulate async response
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (valid) this.loggedUser = user;

    return valid!;
  }
}

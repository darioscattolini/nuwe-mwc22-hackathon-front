import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

/**
 * Builds User service
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Currently logged user
   */
  public loggedUser?: User;

  /**
   * Creates User service
   * @param {HttpClient} http - Http client dependency
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Attempts to log in with provided parameters
   * @param email string
   * @param password string
   * @returns {boolean} Whether log in was successful
   */
  public logIn(email: string, password: string): boolean {
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

  /**
   * Checks if the email being used for sign up is not already in use by
   * registered user
   * @param email string
   * @returns {boolean} Whether the email is valid
   */
  public async checkEmail(email: string): Promise<boolean> {
    // http call to check if email is free and have it reserved for this sign up
    // this.http...
    // below is simulated response
    const valid = true;

    // simulate async response
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    return valid!;
  }

  /**
   * Logs current user out
   */
  public logOut() {
    // http call to log out from server

    this.loggedUser = undefined;
  }

  /**
   * Attempts to fulfill sign up at the server
   * @param user {User} User created from data provided at sign up
   * @returns {boolean} Whether sign up is successful
   */
  public async signUp(user: User): Promise<boolean> {
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

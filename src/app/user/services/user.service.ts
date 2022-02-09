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
    const userData: User['personalData'] = '' as unknown as User['personalData'];

    if (userData) {
      this.loggedUser = new User(userData);
      return true;
    } else {
      return false;
    }
  }

  public submitPersonalData(data: User['personalData']) {
    // here one should make Http call submitting personal data, returning if data
    // could be saved or not
    // this.http...
    const valid = true;

    return valid;
  }
}

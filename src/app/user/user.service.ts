import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModule } from './user.module';
import { User } from './user.model';

@Injectable({
  providedIn: UserModule
})
export class UserService {
  public loggedUser?: User;

  constructor(
    private http: HttpClient
  ) {}

  public logIn(email: string, password: string) {
    console.log(email, password);
    // here one should make Http call with email and password and get user data
    const userData = '' // this.http...

    if (userData) {
      this.loggedUser = new User();   // userData should be used as parameters
      return true;
    } else {
      return false;
    }
  }
}

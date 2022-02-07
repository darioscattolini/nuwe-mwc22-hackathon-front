import { Injectable } from '@angular/core';
import { UserModule } from './user.module';
import { User } from './user.model';

@Injectable({
  providedIn: UserModule
})
export class UserService {
  public loggedUser?: User;
}

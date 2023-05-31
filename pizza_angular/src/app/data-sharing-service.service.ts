import { Injectable } from '@angular/core';
import { Token, User } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {
  private user : any = undefined;
  private token : Token = new Token;

  setUser(data: User) {
    this.user = data;
  }

  getUser(): User {
    return this.user;
  }
  setToken(data: Token) {
    this.token = data;
  }

  getToken(): Token {
    return this.token;
  }
}

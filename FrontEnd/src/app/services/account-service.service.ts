import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private router: Router) { }

  updateAccount(user: User) {
    if (sessionStorage.getItem('token') == null || this.isUserChanged(user)) {
      console.log('updateAccount: ' + user.username + ' ' + user.userPassword);
      let token = this.getAuthenticationToken(user.username, user.userPassword);  
      sessionStorage.setItem('token', token);
    }
    user.userPassword = ''; // Remove password for security
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
  getAuthenticationToken(username: string, password: string) {
    return 'basic ' + Buffer.from(username + ':' + password).toString('base64');
  }
  
  isUserChanged(user: User): boolean {
    return (sessionStorage.getItem('user') != JSON.stringify(user));
  }
  
  get user(): User {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  get isLoggedIn(): boolean {
    return (sessionStorage.getItem('user') != null);
  }

}

import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private router: Router) { }

  updateAccount(user: User) {
    if (sessionStorage.getItem('token') == null || this.isUserChanged(user)) {
      sessionStorage.setItem('token', this.getAuthenticationToken(user.username, user.userPassword));
    }
    
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
  getAuthenticationToken(username: string, password: string) {
    return 'basic ' + btoa(username + ':' + password);
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

import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Equation } from '../models/Equation';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  url: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // CORS
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // CORS
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type', // CORS
      'Access-Control-Allow-Credentials': 'true', // CORS
      'Vary': 'Origin' // CORS
    }),
    observe: 'response' as 'response'
  };

  get user(): User {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  addUser(object: any) {
    object.user = this.user;
    return object;
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/register', user, this.httpOptions);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/login', user, this.httpOptions);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete<any>(this.url + '/user', { headers: this.httpOptions.headers, observe: 'response', body: user });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.url + '/user', user, this.httpOptions);
  }


  getEquations(): Observable<any> {
    return this.http.get<any>(this.url + '/equation/' + this.user.userID, this.httpOptions);
  }

  saveEquation(equation: Equation): Observable<any> {
    equation = this.addUser(equation);
    return this.http.put<any>(this.url + '/equation', equation, this.httpOptions);
  }

  deleteEquation(equation: Equation): Observable<any> {
    return this.http.delete<any>(this.url + '/equation', { headers: this.httpOptions.headers, observe: 'response', body: equation });
  }
}

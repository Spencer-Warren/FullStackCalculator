import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../services/restapi.service';
import { AccountServiceService } from '../services/account-service.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private router: Router, private api: RestapiService, private account: AccountServiceService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user: User = User.of(this.loginForm.value.username, this.loginForm.value.password);
      this.api.loginUser(user).subscribe(
        (res) => {
          if (res.status == 200) {
            alert('Login successful');
            this.account.updateAccount(res.body);
            this.router.navigate(['calculator']);
          }
          else {
            alert('Login failed');
            this.loginForm.reset();
          }
        }
      );
    }
  }
}
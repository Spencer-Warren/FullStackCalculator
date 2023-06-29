import { Component } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  basicValidators: ValidatorFn[] = [Validators.required, Validators.minLength(3)];

  constructor(private router: Router, private api: RestapiService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl<string>('', this.basicValidators),
      email: new FormControl<string>('', Validators.email),
      password: new FormControl<string>('', this.basicValidators),
      passwordConfirm: new FormControl<string>('', this.basicValidators)
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) return;
    let temp = this.registerForm.value;
    if (temp.password != temp.passwordConfirm) return;
    let user: User = User.of(temp.username, temp.password, temp.email);
    console.log(user);
    this.api.registerUser(user).subscribe(() => {
      alert("Account Created! You can now login.");
      this.router.navigate(["/login"]);
    });
  }
}

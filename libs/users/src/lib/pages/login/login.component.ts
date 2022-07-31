import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get loginForm(): { [key: string]: AbstractControl } {
    return this.loginFormGroup.controls;
  }

}

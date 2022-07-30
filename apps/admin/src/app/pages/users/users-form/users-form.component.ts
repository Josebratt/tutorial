import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@tutorial/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import * as countriesLib from "i18n-iso-countries";
declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId = '';
  countries: any[] = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();
    this._getcontries();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value,
      email: this.form.get('email')?.value, 
      phone: this.form.get('phone')?.value, 
      isAdmin: this.form.get('isAdmin')?.value, 
      street: this.form.get('street')?.value, 
      apartment: this.form.get('apartment')?.value, 
      zip: this.form.get('zip')?.value, 
      city: this.form.get('city')?.value, 
      country: this.form.get('country')?.value, 
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        timer(2000).subscribe(
          r => this.location.back()
        )
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }

  /**/
  private _checkEditMode() {
    let id = '';
    this.route.params.subscribe(
      (params) => {
        id = params['id']
      if (id) {
        this.editmode = true;
        this.currentUserId = id;
        this.usersService.getUser(id).subscribe((user) => {
          this.form.get('name')?.setValue(user.name);
          this.form.get('email')?.setValue(user.email);
          this.form.get('phone')?.setValue(user.phone);
          this.form.get('isAdmin')?.setValue(user.isAdmin);
          this.form.get('street')?.setValue(user.street);
          this.form.get('apartment')?.setValue(user.apartment);
          this.form.get('zip')?.setValue(user.zip);
          this.form.get('city')?.setValue(user.city);
          this.form.get('country')?.setValue(user.country);

          this.form.get('password')?.setValidators([]);
          this.form.get('password')?.updateValueAndValidity();
        });
      }
    });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  onCancel() {
    this.location.back();
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //
  private _getcontries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(
      (entry) => {
        return {
          id: entry[0],
          name: entry[1]
        }
      }
    );  
  }

}

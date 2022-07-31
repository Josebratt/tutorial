import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@tutorial/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers = environment.apiURL + 'users';

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router
  ) { }

  login(email: string, passwordHash: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, passwordHash });
  }

  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }

}

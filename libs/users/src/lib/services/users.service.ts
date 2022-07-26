import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@tutorial/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    apiURLUsers = environment.apiURL + 'users';

    constructor(
        private http: HttpClient
    ){}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
      }
    
      getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
      }
    
      createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
      }
    
      updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
      }
    
      deleteUser(userId: string): Observable<User> {
        return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
      }

}
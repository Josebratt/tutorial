import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = this.localstorageService.getToken();
    
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this._tokenExprired(tokenDecode.exp)) {
        return true;
      } 
    }
    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExprired(expiration: number): boolean {
    return Math.floor(new Date().getTime()/1000) >= expiration;
  }
  
}

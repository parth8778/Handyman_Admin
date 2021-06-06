import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    
  constructor(public router: Router) {}

  canActivate(): boolean {
    console.log('localStorage.getItem(): ', localStorage.getItem('authenticatedId'));
    if (!localStorage.getItem('authenticatedId')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
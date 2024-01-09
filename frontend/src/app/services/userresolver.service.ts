import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserresolverService implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve() {
    // get  the user's UID
    const uid = this.authService.getUserId();

    // verify that the UID is available
    if (uid) {
      return this.authService.getUserData(uid);
    } else {
      // if the UID is not available, log an error and return null
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ZenturyApiService } from './zentury-api.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private usersService: ZenturyApiService,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.usersService.isUserAuth().pipe(
      tap((res) => {
        if (res) return true;
        else {
          this._snackBar.open("You must be logged in to acces this page!", 'Close');
          this.router.navigate(['/signin']);
        }
        return false;
      })
    );
  }
}

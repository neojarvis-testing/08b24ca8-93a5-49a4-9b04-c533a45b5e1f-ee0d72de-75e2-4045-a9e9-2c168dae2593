import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      const currentUser = this.authService.currentUserValue;

      // Validate role-based access if roles are defined in the route
      if (route.data.roles && !route.data.roles.includes(currentUser.role)) {
        // Redirect to a default page or error page for unauthorized access
        this.router.navigate(['/unauthorized']);
        return false;
      }
      // Authorized access
      return true;
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
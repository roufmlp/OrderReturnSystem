import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthResponse } from '../_interfaces/auth-response';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  route: ActivatedRouteSnapshot;
  state: RouterStateSnapshot;

  constructor(private router: Router, private titleService: Title) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.route = route;
    this.state = state;
    this.setTitle();
    // console.log("this.setTitle()", this.setTitle());
    // console.log('this.route.routeConfig.path', this.route.routeConfig.path);

    if (this.route.routeConfig.path === '') {
      return true;
    }
    if (this[this.route.routeConfig.path] == null) {
      return true;
    }
    const data: AuthResponse = this[this.route.routeConfig.path]();
    // console.log('data.authenticated', data)
    if (!data.authenticated) {
      // this.router.navigate(['verify_otp'])
      this.router.navigate([data.route], { queryParams: {} });
    }
    //console.log(data)

    // return true;

    return data.authenticated;
  }

  private setTitle(): void {
    this.titleService.setTitle(this.route.data.title);
  }

  private generateJSON(route: string, authenticated: boolean): AuthResponse {
    return { route, authenticated };
  }

}

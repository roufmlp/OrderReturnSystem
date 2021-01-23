import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router, private _slimLoadingBarService: SlimLoadingBarService) {
    // clear alert message on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  start(keepAfterNavigationChange: boolean = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this._slimLoadingBarService.start();
    this.subject.next(true);
  }

  stop(keepAfterNavigationChange: boolean = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this._slimLoadingBarService.complete();
    this.subject.next(false);
  }

  getState(): Observable<boolean> {
    return this.subject.asObservable();
  }

}

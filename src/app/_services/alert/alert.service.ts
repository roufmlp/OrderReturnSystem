import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router, private toastr: ToastrService) {
    // clear alert message on route change
    router.events.subscribe(event => {
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

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.toastr.success(message, '');
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.toastr.error(message, '');
    // console.log("error")
    this.subject.next({type: 'error', text: message});
  }

  hide() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

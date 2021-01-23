import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

// Services
import {AlertService} from '../_services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private _alertService: AlertService) {
    this.subscription = this._alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }

}

import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

// Services
import {LoadingService} from '../_services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {

  private subscription: Subscription;
  state: boolean = false;

  constructor(private _loadingService: LoadingService) {
    this.subscription = this._loadingService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }

}

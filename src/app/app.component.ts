import { Component, AfterViewInit } from '@angular/core';

// Services
import { CustomerService } from './_services/customer/customer.service';
// import {ShowReferenceID, SetUserIP} from './_helpers/global.functions';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDate: Date = new Date();
  routerEventSubscription: Subscription;
  currentPath: string;

  constructor(
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath = event.urlAfterRedirects;
      // console.log(event);
      
    })
  }
  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe(); 
  }

  
  
}

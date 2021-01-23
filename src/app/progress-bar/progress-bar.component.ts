import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd,} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  routerEventSubscription: Subscription;
  currentPath;
  colorChange: string;
  percentage: string;
  routeSequence: string[] = [
    '/email',
    '/mobile-number',
    '/income',
    '/company',
    '/confirm',
    '/verify_otp',
    '/product_details',
    '/document_upload',
    '/personal_details',
    '/address',
    '/income_doc',
    '/ar_dc',
    '/success',
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routerEventSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // console.log(event);

      this.currentPath = event.urlAfterRedirects;
      if (this.currentPath.indexOf('/product_details') > -1) {
        this.colorChange = 'white';
      } else {
        this.colorChange = 'black';
      }
      this.percentage = this.countProgressPercentage(event.urlAfterRedirects) + '%';
      // console.log('this.currentPath', this.currentPath);
      // console.log('assistantStates', this.assistantStates);
    });
  }

  countProgressPercentage(path) {
    // console.log(path);

    let pathIndex = this.routeSequence.indexOf(path);
    // console.log('path', path);
    // console.log('pathIndex', pathIndex);
    // console.log('this.routeSequence.length', this.routeSequence.length);

    if (pathIndex > -1) {
      return 100 / (this.routeSequence.length - 1) * pathIndex;
    } else {
      if (path.indexOf('/final') > -1) {
        return 100;
      } else {
        return 0;
      }
    }
  }

}

import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs';
// import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {of} from 'rxjs/internal/observable/of';

// Config
import {Config} from '../app.config';

// Services
import {LoadingService} from '../_services/loading/loading.service';
import {AlertService} from '../_services/alert/alert.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  curRoute: Router;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    };
    
    // console.log(request.headers);
    if (Config.isLocal && request.method === 'POST' && (request.headers.get('Service-Type') !== 'CustomerInformation' && request.headers.get('Service-Type') !== 'ValidateOTP' && (request.urlWithParams !== Config.apiURL + 'KYC/UploadDocumentBase'))) {
      // every request
      headers['SMS-OTP'] = localStorage.getItem('smsOTP');
      headers['X-Authorization-Token'] = localStorage.getItem('Token');
    }
    request = request.clone({
      setHeaders: {...headers}
    });
    // console.log(headers);
    return next.handle(request).pipe(catchError((error, caught) => {
      this.handleError(error);
      return of(error);
    }) as any);
  }

  constructor(private _router: Router, private _loadingService: LoadingService, private _alertService: AlertService) {
    this.curRoute = _router;
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // this._alertService.error(err.message);
    this._loadingService.stop();
    return of(err);
  }

}

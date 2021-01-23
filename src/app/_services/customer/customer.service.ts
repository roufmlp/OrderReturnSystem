import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';

// Config
import {Config} from '../../app.config';

// Services
import {AlertService} from '../alert/alert.service';
import {LoadingService} from '../loading/loading.service';

// Helpers
import {MapResponse, GenerateGlobalHeaders, ManageToken} from '../../_helpers/global.functions';

// Models
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  apiURL: string = Config.apiURL + 'OrderReturns/';
  
  constructor(
    private http: HttpClient,
    private _alertService: AlertService,
    private _loadingService: LoadingService
  ) {
    if (Config.isLocal) {
      this.apiURL = Config.apiURLLocal;
    } else {
      this.apiURL = Config.apiURL + 'OrderReturns/';
    }    
  }

  getIPAddress() {
    // return this.http.get('https://jsonip.com');
    return this.http.get('https://api.ipify.org/?format=json');
  }

  LogIn(UserDetails: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    
    return this.http.post(this.apiURL + 'LogIn', UserDetails, {headers})
      .pipe(map((res: any) => {
        
        return res;
      }));
  }

  NewOrderReturn(OrderReturns: OrderDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    
    return this.http.post(this.apiURL + 'AddNewOrderReturns', OrderReturns, {headers})
      .pipe(map((res: any) => {
        
        return res;
      }));
  }
  NewUserAccess(OrderReturns: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    
    return this.http.post(this.apiURL + 'AddNewUserAccess', OrderReturns, {headers})
      .pipe(map((res: any) => {
        
        return res;
      }));
  }
  
  OrderReturnsList(UserDetails: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    
    return this.http.post(this.apiURL + 'OrderReturnsList', UserDetails, {headers})
      .pipe(map((res: any) => {
        
        return res;
      }));
  }

  getStatusDetails(UserDetails: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    
    return this.http.post(this.apiURL + 'getStatusDetails', UserDetails, {headers})
      .pipe(map((res: any) => {
        
        return res;
      }));
  }

  WharehouseList(UserDetails: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }    
    return this.http.post(this.apiURL + 'WharehouseList', UserDetails, {headers})
      .pipe(map((res: any) => {        
        return res;
      }));
  }

  FinanceList(UserDetails: UserDetailsModel, isAlreadyLoading: boolean = false) {
    let headers = null;
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }    
    return this.http.post(this.apiURL + 'FinanceList', UserDetails, {headers})
      .pipe(map((res: any) => {        
        return res;
      }));
  }

  warehouseSubmit(requestObject, isAlreadyLoading: boolean = false, optionalObj?: Object) {
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    let requestObj: any = null;
    let url: any = null;
    
      requestObj = {
        ...requestObject,
        ...optionalObj
      };
      url = this.apiURL + 'warehouseSubmit';

    return this.http.post(url, requestObj)
      .pipe(map((res: any) => {
        res = MapResponse(res);
        
        localStorage.setItem('warehouseSubmit', 'true');
        if (!isAlreadyLoading) {
          this._loadingService.stop();
        }
        return res;
      }));
  }

  financeSubmit(requestObject, isAlreadyLoading: boolean = false, optionalObj?: Object) {
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    let requestObj: any = null;
    let url: any = null;
    
      requestObj = {
        ...requestObject,
        ...optionalObj
      };
      url = this.apiURL + 'financeSubmit';

    return this.http.post(url, requestObj)
      .pipe(map((res: any) => {
        res = MapResponse(res);
        
        localStorage.setItem('financeSubmit', 'true');
        if (!isAlreadyLoading) {
          this._loadingService.stop();
        }
        return res;
      }));
  }

  finalPickup(requestObject, isAlreadyLoading: boolean = false, optionalObj?: Object) {
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    let requestObj: any = null;
    let url: any = null;
    
      requestObj = {
        ...requestObject,
        ...optionalObj
      };
      url = this.apiURL + 'finalPickup';

    return this.http.post(url, requestObj)
      .pipe(map((res: any) => {
        res = MapResponse(res);
        
        localStorage.setItem('finalPickup', 'true');
        if (!isAlreadyLoading) {
          this._loadingService.stop();
        }
        return res;
      }));
  }
  uploadDocuments(requestObject, isAlreadyLoading: boolean = false, optionalObj?: Object) {
    if (!isAlreadyLoading) {
      this._loadingService.start();
    }
    let requestObj: any = null;
    let url: any = null;
    
      requestObj = {
        ...requestObject,
        ...optionalObj
      };
      url = this.apiURL + 'UploadDocumentBase';
    
    return this.http.post(url, requestObj)
      .pipe(map((res: any) => {
        res = MapResponse(res);
        if (Config.isLocal) {
          ManageToken(res);
          if (!res.IsSuccess) {
            // this._alertService.error(res.AppStatus.ErrorMessage);
            if (!isAlreadyLoading) {
              this._loadingService.stop();
            }
            return res;
          }
        } else {
          if (!res.success) {
            // this._alertService.error(res.message);
            if (!isAlreadyLoading) {
              this._loadingService.stop();
            }
            return res;
          }
        }
        localStorage.setItem('documentUploadDone', 'true');
        if (!isAlreadyLoading) {
          this._loadingService.stop();
        }
        return res;
      }));
  }

}

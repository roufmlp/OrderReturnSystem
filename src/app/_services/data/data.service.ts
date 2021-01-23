import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';


// Config
import {Config} from '../../app.config';

// Service
import {LoadingService} from '../loading/loading.service';
import {AlertService} from '../alert/alert.service';

// Helpers
import {ManageGlobalResponse, MapResponse} from '../../_helpers/global.functions';

// Models
import {GlobalModel} from '../../_models/global-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL: string = Config.apiURL + 'OrderReturns/';

  constructor(private http: HttpClient, private _loadingService: LoadingService, private _alertService: AlertService) {
    this.apiURL = Config.apiURL + 'OrderReturns/';
  }

  getProducts(stateName: string = 'ItemList') {
    let url = '';
    url = this.apiURL + 'ItemList';
    
    return this.http.get<any>(url)
      .pipe(map((res) => {
        // debugger;
        res = MapResponse(res);
          return ManageGlobalResponse(res, stateName);
      }));
  }
}

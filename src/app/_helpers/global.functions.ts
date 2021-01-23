import {HttpHeaders} from '@angular/common/http';

// Services
import {CustomerService} from '../_services/customer/customer.service';

// Config
import {Config} from '../app.config';

// Models
import {GlobalModel} from '../_models/global-model';

export const MapResponse = (res: any) => {
  res = (res && res.hasOwnProperty('d')) ? res.d : res;
  if ((res && res.hasOwnProperty('__type'))) {
    delete res.__type;
  }
  return res;
};

export const GenerateGlobalHeaders = (value: string = '') => (
  new HttpHeaders({
    'Service-Type': value
  })
);

export const SetUserIP = (_customerService: CustomerService) => {
  if (!Config.isLocal) {
    _customerService.getIPAddress().subscribe((data: any) => {
      localStorage.setItem('clientIPAddress', data.ip);
    });
  }
};

export const ManageToken = (object: any = null): void => {
  let token: string = '';
  if (object) {
    if ((object && object.hasOwnProperty('Token'))) {
      token = object.Token;
    }
    if ((object && object.hasOwnProperty('AppStatus')) && (object.AppStatus && object.AppStatus.hasOwnProperty('Token'))) {
      token = object.AppStatus.Token;
    }
    if (token !== '') {
      localStorage.setItem('Token', token);
    } else {
      localStorage.removeItem('Token');
    }
  }
};

export const isDate = (value): boolean => {
  return value instanceof Date;
};


export const ManageModelsProperties = (instance: any, object: any, currentInstance: any = null, otherInstances: any[] = [Date]): void => {
  // console.log('instance', instance);
  // console.log('object', object);
  // console.log('instance', instance);
  const manageThings = (props, isProps: boolean = true): void => {
    if (!isProps) {
      instance[props] = object[props] ? object[props] : instance[props];
    } else {
      if (instance[props] instanceof Date) {
        instance[props] = object[props] ? new Date(object[props]) : new Date();
      } else {
        instance[props] = object[props] ? object[props] : instance[props];
      }
    }
  };
  if (object) {
    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        let isProps: boolean = true;
        if (!instance.hasOwnProperty(property)) {
          isProps = false;
        }
        manageThings(property, isProps);
      }
    }
    for (const property in instance) {
      if (instance.hasOwnProperty(property)) {
        let isProps: boolean = true;
        if (!object.hasOwnProperty(property)) {
          isProps = false;
        }
        manageThings(property, isProps);
      }
    }
  }
};

export const SetState = async (Model: { name: string, object: any }, cb: any = null): Promise<void> => {
  if (cb) {
    Model.object = await cb(Model.object);
  }
  localStorage.setItem(Model.name, JSON.stringify(Model.object));
};

export const Min21Years = (): Date => {
  const date1 = new Date();
  return new Date(date1.getFullYear() - 21, date1.getMonth() + 1, date1.getDate());
};

export const MinYears = (): Date => {
  const date1 = new Date();
  return new Date(date1.getFullYear() - 65, date1.getMonth() + 1, date1.getDate());
};

export const MinNextMonth = (): Date => {
  const date1 = new Date();
  return new Date(date1.getFullYear(), date1.getMonth() + 1, date1.getDate() + 1);
};

export const MaxLastMonth = (): Date => {
  const date1 = new Date();
  return new Date(date1.getFullYear(), date1.getMonth() - 1, date1.getDate());
};

export const GlobalCallBack = (type: string = 'Nationalities', method: string = 'getCountries', instance: any = null): void => {
  instance._dataService[method](type).subscribe((res: any) => {
    instance[type] = res;
  });
};

export const ManageGlobalResponse = (res: any = null, stateName: string = ''): GlobalModel[] | null => {  
  // if (res && stateName && JSON.parse(res) != null) {
    // debugger;
    GlobalModel.setState(stateName, JSON.parse(res));
    const List: GlobalModel[] = JSON.parse(res);
    if (List && List.length > 0) {
      for (let i = 0; i < List.length; i++) {
        List[i] = new GlobalModel(List[i]);
      }
    }
    return List;
  // }
  return null;
};


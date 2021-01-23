import {SetState} from '../_helpers/global.functions';

export class CustomerDetailsModel {
  ID?: string = '';
  FirstName?: string = '';
  LastName?: string = '';
  PhoneNo?: string = '';
  EmailID?: string = '';
  Addres?: string = '';  
  constructor() {
    // ManageModelsProperties(this, A, CustomerDetailsModel, []);
  }

  public static setState(As: CustomerDetailsModel = CustomerDetailsModel.getState()): void {        
    SetState({name: 'CustomerDetailsModel', object: As});
  }

  public static getState(): CustomerDetailsModel {
    if (JSON.parse(localStorage.getItem('CustomerDetailsModel')) != null) {
      return JSON.parse(localStorage.getItem('CustomerDetailsModel'));      
    }
    return 
      new CustomerDetailsModel();
  }

}

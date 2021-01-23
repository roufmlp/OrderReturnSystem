import {SetState} from '../_helpers/global.functions';

export class StatusDetailsModel {
  ID?: string = '';
  ReturnID?: string='';
  ProductName?: string='';
    Quantity?: string='';
    Status?: string='';
    ReasonForReturn?: string='';    
    CustomerName?: string='';
    PhoneNo?: string='';
    Address?: string='';
    PurchaseDate?: string='';
    CreatedDate?: string='';    
    WarehouseComment?: string='';
    FinanceComment?: string='';
    
  constructor() {
    // ManageModelsProperties(this, A, StatusDetailsModel, []);
  }

  public static setState(As: StatusDetailsModel = StatusDetailsModel.getState()): void {        
    SetState({name: 'StatusDetailsModel', object: As});
  }

  public static getState(): StatusDetailsModel {
    if (JSON.parse(localStorage.getItem('StatusDetailsModel')) != null) {
      return JSON.parse(localStorage.getItem('StatusDetailsModel'));      
    }
    return 
      new StatusDetailsModel();
  }

}

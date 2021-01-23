// Helpers
import {ManageModelsProperties, SetState} from '../_helpers/global.functions';

// Config

// Models
import { ProductDetailsModel } from './product-details-model';
import { CustomerDetailsModel } from './customer-details-model';

export class OrderDetailsModel {
  OrderID?: string='';
  
  custRefNo?: string;
  CustomerName?: string = '';
  MobileNumber?: string = '';
  DateOfPurchase?: Date = new Date();
  Address?: string = '';
  Satus?: string = '';
  password?: string = '';
  // ProductDetails: Array<any>;
  ProductDetails: ProductDetailsModel[] = ProductDetailsModel.getState();
  CustomerDetails: CustomerDetailsModel=CustomerDetailsModel.getState();
  NoOfProducts?: number=0;
  CreatedBy?: string='';

  DateUpdated?: Date = new Date();
  UpdatedBy?: string='';
  // CustomerLastName?: string = '';
  // CustomerFullName?: string = '';
  // DateOfBirth?: Date = new Date();
  // Email?: string = '';
  // EmiratesId?: string = '';
  // EmiratesIdExpiryDate?: Date = new Date(2019, 7, 3);
  // NoEIDReason?: string = '';
  // Gender?: string = '';
  // Education?: string = '';
  // MaritalStatus?: string = '';
  // MailingOption?: string = '';
  
  // NationalityCode?: string = '';
  // PassportExpiryDate?: Date = null;
  // PassportIssuedDate?: Date = null;
  // PassportNumber?: string = '';
  // ResidentType?: string = ResidentTypeModel.getState().value;
  // // ResidentType?: string = 'Y';
  // UniqueIdExpiryDate?: Date = null;
  // UniqueIdNumber?: string = '';
  // // UniqueIdType?: string = Config.MetaData.UniqueIdType;
  // UniqueIdType?: string = '';
  // PrefferedBranchCode?: string = '';
  // PrefferedBranch?: string = GlobalModel.getStateBy('code', this.PrefferedBranchCode, 'EmiratesList').title;
  // // PrefferedBranch?: string = '';
  // SourceBranchCode?: string = '';
  // SourceBranch?: string = GlobalModel.getStateBy('code', this.SourceBranchCode, 'BranchList').title;
  // // SourceBranch?: string = '';
  // Recent1MonthSalary?: string;
  // Recent1MonthSalaryDate?: string;
  // Recent2MonthSalary?: string;
  // Recent2MonthSalaryDate?: string;
  // Recent3MonthSalary?: string;
  // Recent3MonthSalaryDate?: string;
  // IsProvidedSalaryCertificate?: string;
  // IsHavingOtherCC?: string;
  // OtherBankName?: string;
  // CIFNumber?: string;
  // ApproxBalanceMaintain?: string = '';

  constructor(PD: OrderDetailsModel = null) {
    if (PD) {
      // PD.UniqueIdExpiryDate = PD.PassportExpiryDate;
      // PD.UniqueIdNumber = PD.PassportNumber;
      // PD.PrefferedBranch = GlobalModel.getStateBy('code', PD.PrefferedBranchCode, 'EmiratesList').title;
      // PD.SourceBranch = GlobalModel.getStateBy('code', PD.SourceBranchCode, 'BranchList').title;
    }
    ManageModelsProperties(this, PD, OrderDetailsModel, []);
    // this._validateDateOfBirth();
    // this._validatePassportIssuedDate();
    // this._validatePassportExpiryDate();
  }

  public static setState(As: OrderDetailsModel[] = OrderDetailsModel.getState()): void {
    if (As && As.length > 0) {
      for (let i = 0; i < As.length; i++) {
        As[i] = new OrderDetailsModel(As[i]);
      }
    } else {
      As = OrderDetailsModel.getState();
    }
    SetState({name: 'OrderDetailsModel', object: As});
  }


  public static getState(): OrderDetailsModel[] {
    if (JSON.parse(localStorage.getItem('OrderDetailsModel')) != null) {
      const Productes: OrderDetailsModel[] = JSON.parse(localStorage.getItem('OrderDetailsModel'));
      if (Productes && Productes.length > 0) {
        for (let i = 0; i < Productes.length; i++) {
          Productes[i] = new OrderDetailsModel(Productes[i]);
        }
        return Productes;
      }
    }
    return [
      new OrderDetailsModel()
      // new ProductDetailsModel({ProductType: 'Reference'}),
      // new ProductDetailsModel({ProductType: 'Reference'})
    ];
  }
  // public static getState(): OrderDetailsModel {
  //   if (JSON.parse(localStorage.getItem('OrderDetailsModel')) != null) {
  //     return new OrderDetailsModel(JSON.parse(localStorage.getItem('OrderDetailsModel')));
  //   }
  //   return new OrderDetailsModel();
  // }

  // private _validateDateOfBirth(): void {
  //   if (this.DateOfBirth) {
  //     if (this.DateOfBirth.getTime() > Min21Years().getTime()) { // max
  //       this.DateOfBirth = Min21Years();
  //     }
  //     if (this.DateOfBirth.getTime() < MinYears().getTime()) { // min
  //       this.DateOfBirth = Min21Years();
  //     }
  //   }
  // }


}

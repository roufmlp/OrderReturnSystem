import {ManageModelsProperties, SetState} from '../_helpers/global.functions';

export class ProductDetailsModel {
  ReturnID?:string=''
  ID?: string = '';
  // Type?: string = '';
  // Name?: string = '';
  Quantity?: string = '';
  Price?: string = '';
  Discount?: string = '';
  // Pic?: string = '';
  Image?: string = '';
  // isReturned?: boolean = false;
  Status?:string='';
  DateUpdated?:Date = new Date();
  UpdatedBy?:string='';
  WarehouseComment?:string='';
  ProductName?:string = '';
  ProductType?:string = '';
  ReasonForReturn?:string = '';
  constructor(A: ProductDetailsModel = null) {
    ManageModelsProperties(this, A, ProductDetailsModel, []);
  }

  public static setState(As: ProductDetailsModel[] = ProductDetailsModel.getState()): void {
    if (As && As.length > 0) {
      for (let i = 0; i < As.length; i++) {
        As[i] = new ProductDetailsModel(As[i]);
      }
    } else {
      As = ProductDetailsModel.getState();
    }
    SetState({name: 'ProductDetailsModel', object: As});
  }

  public static getState(): ProductDetailsModel[] {
    if (JSON.parse(localStorage.getItem('ProductDetailsModel')) != null) {
      const Productes: ProductDetailsModel[] = JSON.parse(localStorage.getItem('ProductDetailsModel'));
      if (Productes && Productes.length > 0) {
        for (let i = 0; i < Productes.length; i++) {
          Productes[i] = new ProductDetailsModel(Productes[i]);
        }
        return Productes;
      }
    }
    return [
      new ProductDetailsModel()
      // new ProductDetailsModel({ProductType: 'Reference'}),
      // new ProductDetailsModel({ProductType: 'Reference'})
    ];
  }

}

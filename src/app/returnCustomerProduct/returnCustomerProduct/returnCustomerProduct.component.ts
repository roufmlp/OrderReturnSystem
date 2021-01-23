import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import {NgForm, FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, throttleTime } from 'rxjs/operators';

// Interfaces
import {DateMeta} from '../../_interfaces/date-meta';

// Models
import {GlobalModel} from '../../_models/global-model';

// Helpers
import {GlobalCallBack, MaxLastMonth, Min21Years, MinNextMonth, MinYears} from '../../_helpers/global.functions';

// Services
import {CustomerService} from '../../_services/customer/customer.service';
import {Config} from '../../app.config';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';
// import {AddressDetailsModel} from '../../_models/address-details-model';
// import {ProductDetailsModule} from 'src/app/product-details/product-details.module';

declare const $: any;

@Component({
  selector: 'app-returnCustomerProduct',
  templateUrl: './returnCustomerProduct.component.html',
  styleUrls: ['./returnCustomerProduct.component.css'],
})
export class ReturnCustomerProductComponent implements OnInit, AfterViewInit {
  // CustomerDetails: PersonalDetailsModel[];
  CustomerDetails: Array<OrderDetailsModel> = [];
  SelectedCustomer:OrderDetailsModel;
  SelectedProduct:ProductDetailsModel;

  DateToShow: Date;
  workDetailsForm: FormGroup;
  formSubmitted: boolean = false;
  
  @ViewChild('f') f: NgForm;
  personalDetailsForm:FormGroup;

  otherOpen: boolean = false;

  filteredOptions: Observable<GlobalModel[]>;
  // CustomerDetails: PersonalDetailsModel[];


  filteredOptionsJobTitle: Observable<GlobalModel[]>;
  filteredOptionsDesignation: Observable<GlobalModel[]>;
  filteredOptionsBranchList: Observable<GlobalModel[]>;
  // ProductDetails: AIPProductsModel[] = this.AppDetails.ProductDetails;


  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    if('SelectedCustomer' in localStorage){
      this.SelectedCustomer = JSON.parse(localStorage.getItem('SelectedCustomer'));
    }
    if('SelectedProduct' in localStorage){
      this.SelectedProduct = JSON.parse(localStorage.getItem('SelectedProduct'));
    }
    // console.log("SelectedCustomer",this.SelectedCustomer);    
  }

  ngOnChanges(changes): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  SelectProduct(obj){
    // console.log(obj);
    this._router.navigate(['/returnCustomerProduct']);
  }
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }

  allowedFormatValidator(allowedChars: RegExp, errorName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isInputValueValid = allowedChars.test(control.value);
      return isInputValueValid ? null : {[errorName.toString()]: {value: control.value}};
    };
  }

  displayFn(user?: GlobalModel): string | undefined {
    //debugger;
    return user ? user.title : undefined;
  }
  

  private _filter(value: string,filtermodel: GlobalModel[]): GlobalModel[] {
    const filterValue = value.toLowerCase();
    let returnValue = filtermodel.filter((option: GlobalModel) => {
      return option.title.toLowerCase().indexOf(filterValue) > -1
    });
    // console.log('returnValue', returnValue);
    return returnValue;
  }
}
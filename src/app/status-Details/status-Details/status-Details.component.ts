import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import {NgForm, FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

// Interfaces
import {DateMeta} from '../../_interfaces/date-meta';

// Models
import {OrderDetailsModel} from '../../_models/order-details-model';
import {GlobalModel} from '../../_models/global-model';

// Helpers
import {GlobalCallBack, MaxLastMonth, Min21Years, MinNextMonth, MinYears} from '../../_helpers/global.functions';

// Services
import {CustomerService} from '../../_services/customer/customer.service';
import {Config} from '../../app.config';
import { AgGridAngular } from 'ag-grid-angular';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { DataService } from 'src/app/_services/data/data.service';
import { StatusDetailsModel } from 'src/app/_models/status-details-model';
// import {ProductDetailsModule} from 'src/app/product-details/product-details.module';

declare const $: any;

@Component({
  selector: 'app-status-Details',
  templateUrl: './status-Details.component.html',
  styleUrls: ['./status-Details.component.css'],
})
export class StatusDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { field: 'ReturnID' , sortable: true},
    { field: 'CustomerName' , sortable: true, filter: true},
    { field: 'PhoneNo' , sortable: true},
    { field: 'Address' , sortable: true},
    { field: 'ProductName' , sortable: true},
    { field: 'Quantity'},
    { field: 'Status' , sortable: true},           
    { field: 'PurchaseDate' , sortable: true},
    { field: 'CreatedDate' , sortable: true},   
    { field: 'ReasonForReturn' , sortable: true},  
    { field: 'WarehouseComment' , sortable: true},
    { field: 'FinanceComment' , sortable: true},
];

rowData: Array<StatusDetailsModel> = [];


  
  newOrderReturn: FormGroup;
  formSubmitted: boolean = false;
  @ViewChild('f') f: NgForm;
  
  OrderDetails: OrderDetailsModel=new OrderDetailsModel();
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  
  ItemList: GlobalModel[];



  purchaseDateMeta: DateMeta = {
    // minDate: MinNextMonth(),
    maxDate: new Date()
  };


  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _dataService: DataService
  ) {
  }

  ngOnInit() {

    this._loadingService.start();
    if(this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="2"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    this._customerService.getStatusDetails(UserDetailsModel.getState()).subscribe(items => {
      debugger;        
      this.rowData = items;
    });
    this._loadingService.stop();

  }

  AddNewItem(){
   
    
  }
  ngOnChanges(changes): void {
  }


  ngAfterViewInit() {
    
    this.cdRef.detectChanges();

  }

  allowedFormatValidator(allowedChars: RegExp, errorName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isInputValueValid = allowedChars.test(control.value);
      return isInputValueValid ? null : {[errorName.toString()]: {value: control.value}};
    };
  }


  Done(): void {
    this._router.navigate(['/home']);
  }


  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    this._router.navigate(['/home']);
  }
}

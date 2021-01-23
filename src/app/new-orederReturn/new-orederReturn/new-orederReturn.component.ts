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
// import {ProductDetailsModule} from 'src/app/product-details/product-details.module';

declare const $: any;

@Component({
  selector: 'app-new-orederReturn',
  templateUrl: './new-orederReturn.component.html',
  styleUrls: ['./new-orederReturn.component.css'],
})
export class NewOrederReturnComponent implements OnInit, AfterViewInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { field: 'ID'},
    { field: 'ItemName'},
    { field: 'Qty'}    
];

rowData = [
  // { ID: 1, ItemName: 'Toyota', Qty: 'Celica'},
  // { ID:2, ItemName: 'Ford', Qty: 'Mondeo'},
  // { ID:3, ItemName: 'Porsche', Qty: 'Boxter'}
];


  
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
    this._loadingService.stop();
    if(this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="2"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }
    debugger;
    if ('ItemList' in localStorage) {
      this.ItemList = JSON.parse(localStorage.getItem('ItemList'));
    }
    if (!this.ItemList || this.ItemList.length<=0){      
      this._dataService.getProducts().subscribe(items => {        
        this.ItemList = items;
      });
    }
      this.newOrderReturn = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.allowedFormatValidator(/^([a-zA-Z ]?)*$/, 'onlyAlpabetCharsAllowed')
      ]],
      mobile: ['', [
        Validators.required,
        this.allowedFormatValidator(/^[025648][0-9]{9}$/, 'invalidMobileFormat')
      ]],
      Address: [ '', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      Item: ['' , [
        // Validators.required
      ]],
      quantity: ['', [
        // Validators.required,
        // this.allowedFormatValidator(/^[123456789][0-9]*$/, 'invalidMobileFormat')
      ]],
      purchaseDate: [this.OrderDetails.DateOfPurchase, [
        Validators.required,
      ]]      
    });    

  }

  AddNewItem(){
    // debugger;  
    let ItemName = GlobalModel.getStateBy('code', this.newOrderReturn.get('Item').value, 'ItemList').title;
    let ItemCode = this.newOrderReturn.get('Item').value;
    let Qty = this.newOrderReturn.get('quantity').value;
    
    if(!ItemCode){
      this._alertService.error('Please select any Item from the list!');
      return;
    }
    if(!Qty){
      this._alertService.error('Please enter the quantity');
      return;
    }
    this.rowData.unshift({ID:ItemCode,ItemName:ItemName,Qty:Qty});  
        
    this.agGrid.api.setRowData(this.rowData);
    
    this.newOrderReturn.patchValue( {'quantity':null} );
    this.newOrderReturn.patchValue( {'Item':null} );
    
    this._alertService.success('1 Item is Added, Click "Submit Order" button to Complete the Order');
    
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


  submitNewOrder(): void {
    // debugger;

    this.formSubmitted = true;    
    if (this.newOrderReturn.invalid) {
      Object.keys(this.newOrderReturn.controls).forEach(key => {
        let target = this.newOrderReturn.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please enter customer details!');
      return;
    }

    if(!this.rowData || this.rowData.length<=0){
      this._alertService.error('Please add atlease one product!');
      return;
    }

    let purchaseDate: string;

    purchaseDate = this.newOrderReturn.get('purchaseDate').value;

    
    const user:UserDetailsModel=UserDetailsModel.getState();
    
    const dataForOrderDetails: OrderDetailsModel = {
      ...JSON.parse(JSON.stringify(this.OrderDetails)),      
      CustomerName: this.newOrderReturn.get('firstName').value,
      MobileNumber: this.newOrderReturn.get('mobile').value,
      Address: this.newOrderReturn.get('Address').value,
      DateOfPurchase:purchaseDate,
      NoOfProducts:this.rowData.length,
      CreatedBy:user.ID
      // ProductDetails:this.rowData      
    };


    // debugger;
    for(let i=0;i<this.rowData.length;i++)
    {
        dataForOrderDetails.ProductDetails[i]=new ProductDetailsModel();
        dataForOrderDetails.ProductDetails[i].ID=this.rowData[i].ID;
        dataForOrderDetails.ProductDetails[i].Quantity=this.rowData[i].Qty;
    }
    
    this.OrderDetails = dataForOrderDetails;
    

    // console.log('sitringify', JSON.stringify(dataForOrderDetails));
    // console.log('obj', dataForOrderDetails);

    // debugger;
    this._customerService.NewOrderReturn(this.OrderDetails).subscribe((res: any) => {
      this._loadingService.stop();
      this._alertService.success('New order return has been sent to the driver successfully!');
      this.formSubmitted=false;
      this.f.reset();      
      this.rowData=[];
    });
  }


  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    this._router.navigate(['/home']);
  }
}

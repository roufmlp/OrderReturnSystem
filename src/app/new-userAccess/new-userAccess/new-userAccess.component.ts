import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import {NgForm, FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';  

// Interfaces
import {DateMeta} from '../../_interfaces/date-meta';

// Models

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
  selector: 'app-new-userAccess',
  templateUrl: './new-userAccess.component.html',
  styleUrls: ['./new-userAccess.component.css'],
})
export class NewUserAccessComponent implements OnInit, AfterViewInit {
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


// plainText:string;  
//   encryptText: string;  
//   encPassword: string;  
//   decPassword:string;  
//   conversionEncryptOutput: string;  
//   conversionDecryptOutput:string; 
  
  newUserAccess: FormGroup;
  formSubmitted: boolean = false;
  @ViewChild('f') f: NgForm;
  
  
  UserDetails: UserDetailsModel= new UserDetailsModel();
  
  ItemList: GlobalModel[];

  // Roles: GlobalModel[];

  Roles: GlobalModel[] = [
    new GlobalModel({title: 'Driver', code: '3'}),
    new GlobalModel({title: 'Warehouse', code: '4'}),
    new GlobalModel({title: 'Finance', code: '5'}),
    new GlobalModel({title: 'Admin', code: '1'}),
    new GlobalModel({title: 'Support', code: '2'})
  ];

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
    if(UserDetailsModel.getState().RoleID!="1"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }
    if ('ItemList' in localStorage) {
      this.ItemList = JSON.parse(localStorage.getItem('ItemList'));
    } else {      
      this._dataService.getProducts().subscribe(items => {        
        this.ItemList = items;
      });
    }
      this.newUserAccess = this.formBuilder.group({
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
      username: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.allowedFormatValidator(/^([a-zA-Z]?)*$/, 'onlyAlpabetCharsAllowed')
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]],
      Role: [ '', [
        Validators.required
      ]]
    });    

  }

  AddNewItem(){
    // debugger;  
    let ItemName = GlobalModel.getStateBy('code', this.newUserAccess.get('Item').value, 'ItemList').title;
    let ItemCode = this.newUserAccess.get('Item').value;
    let Qty = this.newUserAccess.get('quantity').value;
    
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
    
    this.newUserAccess.patchValue( {'quantity':null} );
    this.newUserAccess.patchValue( {'Item':null} );
    
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
    if (this.newUserAccess.invalid) {
      Object.keys(this.newUserAccess.controls).forEach(key => {
        let target = this.newUserAccess.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please enter user details!');
      return;
    }

    // if(this.rowData.length<=0){
    //   this._alertService.error('Please add atlease one product!');
    //   return;
    // }

    // let purchaseDate: string;

    // purchaseDate = this.newUserAccess.get('purchaseDate').value;
    // let password=this.convertText("encrypt",this.newUserAccess.get('password').value, "7777")
    let password=this.encrypt(this.newUserAccess.get('password').value, "7777");

    let CreatedBy= Number(UserDetailsModel.getState().ID);    
    // let RoleID = this.newUserAccess.get('Role').value;

    const dataForUserDetails: UserDetailsModel = {            
      FirstName: this.newUserAccess.get('firstName').value,
      MobileNo: this.newUserAccess.get('mobile').value,
      Username: this.newUserAccess.get('username').value,
      // Password:this.newUserAccess.get('password').value,
      Password:password,
      RoleID:this.newUserAccess.get('Role').value,
      CreatedBy: CreatedBy
    };

    let successmessage="New Access to "+this.newUserAccess.get('firstName').value+" added successfully!"
    // debugger;
    // for(let i=0;i<this.rowData.length;i++)
    // {
    //     // dataForUserDetails.ProductDetails[i]=new ProductDetailsModel();
    //     // dataForUserDetails.ProductDetails[i].ID=this.rowData[i].ID;
    //     // dataForUserDetails.ProductDetails[i].Quantity=this.rowData[i].Qty;
    // }
    
    this.UserDetails = dataForUserDetails;
    

    // console.log('sitringify', JSON.stringify(dataForUserDetails));
    // console.log('obj', dataForUserDetails);

    // debugger;
    this._customerService.NewUserAccess(this.UserDetails).subscribe((res: any) => {
      this._loadingService.stop();
      this._alertService.success(successmessage);
      this._router.navigate(['/home']);
    });
  }


  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    this._router.navigate(['/home']);
  }

   //method is used to encrypt and decrypt the text  
   convertText(conversion:string, txtTextToConvert, passcode) {  
    let result="";
    if (conversion=="encrypt") {  
      result = CryptoJS.AES.encrypt(txtTextToConvert.trim(), passcode).toString();  
    }  
    else {  
      result = CryptoJS.AES.decrypt(txtTextToConvert.trim(), passcode.trim()).toString(CryptoJS.enc.Utf8);  
     
    }  
    return result;
  }

  encrypt (msg, pass) {
    // random salt for derivation
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: 100
      });
    // random IV
    var iv = CryptoJS.lib.WordArray.random(128/8);      
    // specify everything explicitly
    var encrypted = CryptoJS.AES.encrypt(msg, key, { 
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC        
    });
    // combine everything together in base64 string
    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
  }
}

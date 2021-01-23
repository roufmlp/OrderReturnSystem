import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {NgForm, FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
// Interfaces

// Models

// Helpers

// Services
import {CustomerService} from '../../_services/customer/customer.service';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { LoadingService } from 'src/app/_services/loading/loading.service';
// import {ProductDetailsModule} from 'src/app/product-details/product-details.module';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginDetailComponent implements OnInit, AfterViewInit {
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  userDetailsForm: FormGroup;

  formSubmitted: boolean = false;
  @ViewChild('f') f: NgForm;

  encryptSecretKey:string="tR7nR6wZHGjYMCuV";

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    
    localStorage.clear();
      this.userDetailsForm = this.formBuilder.group({
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
      ]]
    });
    // this.userDetailsForm.setValidators(this.dobeidRelation('eidMustIncludeDob'));
  }

  ngOnChanges(): void {
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

  LogIn(){    
    this.formSubmitted = true;
    if (this.userDetailsForm.invalid) {
      Object.keys(this.userDetailsForm.controls).forEach(key => {
        let target = this.userDetailsForm.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      return;
    }

    let password=this.encrypt(this.userDetailsForm.get('password').value, "7777");
    
    const dataForUserDetails: UserDetailsModel = {
      ...JSON.parse(JSON.stringify(this.UserDetails)),
      
      Username: this.userDetailsForm.get('username').value,
      Password: password,
      
    };

    // this.AppDetails.PersonalDetails = dataForPersonalDetails;
   
    this.UserDetails=dataForUserDetails;

    // console.log('sitringify', JSON.stringify(dataForUserDetails));
    // console.log('obj', dataForUserDetails);

    // this._router.navigate(['/work_information']);
    this._customerService.LogIn(this.UserDetails).subscribe((res: any) => {
      if (!res) {
        this._loadingService.stop();
        // console.log("login fail")
        this._alertService.error('Invalid Username and Password!');
        this.userDetailsForm.reset();
      } else {
        // if (res.ErrorCode && res.ErrorCode == 'EXCUSTDED') {
        //   this._router.navigate(['/finalEx']);
        // } else {
          // debugger;
          try{
          var nameArr = res.split(':');
          this.UserDetails.RoleID=nameArr[0];
          this.UserDetails.ID=nameArr[1];
          }catch{}
          this.UserDetails.Password="";
          UserDetailsModel.setState(this.UserDetails);
          // localStorage.setItem('UserDetails',JSON.stringify(this.UserDetails));
          // this._router.navigate(['/driver-customerList']);
          if(this.UserDetails.RoleID=="1" || this.UserDetails.RoleID=="2"){
            this._router.navigate(['/home']);
          }
          else if(this.UserDetails.RoleID=="3"){
            this._router.navigate(['/driver-customerList']);
          }
          else if(this.UserDetails.RoleID=="4"){
            this._router.navigate(['/warehouse-customerList']);
          }
          else if(this.UserDetails.RoleID=="5"){
            this._router.navigate(['/finance-customerList']);
          }
          else{
            this._router.navigate(['/']);
            this._alertService.error("Access Denied!!!")
          }
          
        // }
      }
    });
  }
//   convertText(conversion:string, txtTextToConvert, passcode) {  
//     let result="";
//     if (conversion=="encrypt") {  
//       result = CryptoJS.AES.encrypt(txtTextToConvert.trim(), passcode).toString();  
//     }  
//     else {  
//       result = CryptoJS.AES.decrypt(txtTextToConvert.trim(), passcode.trim()).toString(CryptoJS.enc.Utf8);  
     
//     }  
//     return result;
// }
encryptData(data) {

  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  } catch (e) {
    console.log(e);
  }
}

decryptData(data) {

  try {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
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

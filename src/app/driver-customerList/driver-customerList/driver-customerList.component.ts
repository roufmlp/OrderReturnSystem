import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {NgForm, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

// Interfaces

// Models
import {GlobalModel} from '../../_models/global-model';

// Helpers

// Services
import {CustomerService} from '../../_services/customer/customer.service';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
// import {AddressDetailsModel} from '../../_models/address-details-model';
// import {ProductDetailsModule} from 'src/app/product-details/product-details.module';


@Component({
  selector: 'app-driver-customerList',
  templateUrl: './driver-customerList.component.html',
  styleUrls: ['./driver-customerList.component.css'],
})
export class DriverCustomerListComponent implements OnInit, AfterViewInit {

  UserDetails:UserDetailsModel=UserDetailsModel.getState();
 
  CustomerDetails: Array<OrderDetailsModel> = [];
  filteredCustomerDetails: Array<OrderDetailsModel> = [];
  DateToShow: Date;
  workDetailsForm: FormGroup;
  formSubmitted: boolean = false;
  @ViewChild('f') f: NgForm;

  otherOpen: boolean = false;

  filteredOptions: Observable<GlobalModel[]>;
  
  txtSearch:string="";

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private _alertService: AlertService,
    private _loadingService: LoadingService
  ) {
  }


  ngOnInit() {
    this.txtSearch="";
    localStorage.removeItem("driver-orderDetails");
    localStorage.removeItem("SelectedCustomer");
    this._loadingService.start();
    if(this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="3"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    // console.log("Begin");
    this._loadingService.start();
    this._customerService.OrderReturnsList(this.UserDetails).subscribe((res: any) => {
      // debugger;
      if (res.length<=0) {
        this._loadingService.stop();
        // console.log("res",res);
        this._alertService.error('Records are empty, please visit again later!');        
      } else {
          try{
            localStorage.setItem('OrderDetailsModel',JSON.stringify(res));
            OrderDetailsModel.setState(res);
            // debugger;
            this.CustomerDetails=OrderDetailsModel.getState();
            this.filteredCustomerDetails=OrderDetailsModel.getState();
          }catch{}
          this._loadingService.stop();
          // this._router.navigate(['/driver_customerList']);
        // }
      }
    });
    
    
  }

  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  txtSearchChanged(newObj){
    debugger;
    console.log(newObj);
    this.filteredCustomerDetails=this.CustomerDetails.filter(function(el) {      
      return ( (el.Address && el.Address.toLocaleLowerCase().includes(newObj.toLocaleLowerCase())) || (el.CustomerName &&el.CustomerName.toLocaleLowerCase().includes(newObj.toLocaleLowerCase())) || (el.MobileNumber && el.MobileNumber.toLocaleLowerCase().includes(newObj.toLocaleLowerCase())) || (el.Satus && el.Satus.toLocaleLowerCase().includes(newObj.toLocaleLowerCase())));
    });
  }
  SelectCustomer(obj){
    // console.log(obj);
    localStorage.setItem("driver-orderDetails","true");
    localStorage.setItem("SelectedCustomer",JSON.stringify(obj));
    this._router.navigate(['/driver-orderDetails']);
  }
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    this._router.navigate(['/home']);
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
  

}
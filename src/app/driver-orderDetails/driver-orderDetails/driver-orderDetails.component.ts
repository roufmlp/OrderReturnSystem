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
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { AlertService } from 'src/app/_services/alert/alert.service';


@Component({
  selector: 'app-driver-orderDetails',
  templateUrl: './driver-orderDetails.component.html',
  styleUrls: ['./driver-orderDetails.component.css'],
})
export class DriverOrderDetailsComponent implements OnInit, AfterViewInit {
  // CustomerDetails: PersonalDetailsModel[];
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  CustomerDetails: Array<OrderDetailsModel> = [];
  SelectedCustomer:OrderDetailsModel;

  rejectedBy:string="";
  isRejectedflag:boolean=false;

  DateToShow: Date;
  workDetailsForm: FormGroup;
  formSubmitted: boolean = false;
  documentCollectionMethodSelf: boolean = false;
  @ViewChild('f') f: NgForm;

  otherOpen: boolean = false;

  filteredOptions: Observable<GlobalModel[]>;


  filteredOptionsJobTitle: Observable<GlobalModel[]>;
  filteredOptionsDesignation: Observable<GlobalModel[]>;
  filteredOptionsBranchList: Observable<GlobalModel[]>;
  // ProductDetails: AIPProductsModel[] = this.AppDetails.ProductDetails;

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private _loadingService: LoadingService,
    private _alertService: AlertService,
  ) {
  }


  ngOnInit() {
    localStorage.removeItem("SelectedProduct");    
    if((this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="3") || (localStorage.getItem("driver-orderDetails")!="true")){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }
    localStorage.removeItem("document_upload");
    // if(localStorage.getItem("driver-orderDetails")!="true"){
    //   this._router.navigate(['/']);
    //   this._alertService.error("Access Denied!!!")
    // }

    if('SelectedCustomer' in localStorage){
      this.SelectedCustomer = JSON.parse(localStorage.getItem('SelectedCustomer'));
    }
    // console.log("SelectedCustomer",this.SelectedCustomer);
    
  }

  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  SelectProduct(obj){
    // console.log(obj);
    localStorage.setItem("SelectedProduct",JSON.stringify(obj));
    localStorage.setItem("document_upload","true");
    this._router.navigate(['/document_upload']);
  }
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }

  goBack(){
    // console.log("logout")
    this._router.navigate(['/driver-customerList']);
  }

  isRejected(obj)
  {
    let st = "";
    st=obj.Status;
    if(st.includes('Rejected')){
      try{
        var nameArr = obj.split('_');        
        this.rejectedBy=nameArr[1];        
      }catch{}
      this.isRejectedflag=true;
      return false;
    }
    else if(st!='New' && st!='SentToDriver'){
      return true;
    }
    return false;
  }


  CollectItem(product) {    
    let UserID=UserDetailsModel.getState().ID;
    this._loadingService.start();
    this._customerService.finalPickup({ReturnID: product.ReturnID, UserID }, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Oops, something went wrong!');
        return;
      }
      
      this._alertService.success('Completed!');
      this._router.navigate(['/driver-customerList']);
    });
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
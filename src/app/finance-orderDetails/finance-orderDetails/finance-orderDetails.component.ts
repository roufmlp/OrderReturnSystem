import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


// Models

// Services
import { DataService } from '../../_services/data/data.service';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { CustomerService } from 'src/app/_services/customer/customer.service';
import { AlertService } from 'src/app/_services/alert/alert.service';

declare const $: any;

@Component({
  selector: 'app-finance-orderDetails',
  templateUrl: './finance-orderDetails.component.html',
  styleUrls: ['./finance-orderDetails.component.css'],
})
export class FinanceOrderDetailsComponent implements OnInit, AfterViewInit {
  // CustomerDetails: PersonalDetailsModel[];
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  CustomerDetails: Array<OrderDetailsModel> = [];
  SelectedCustomer: OrderDetailsModel;
  SelectedProduct: ProductDetailsModel;

  financeForm:FormGroup;
  @ViewChild('f') f: NgForm;

  formSubmitted = false;
  
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private _loadingService: LoadingService,
    private _customerService: CustomerService,
    private _alertService: AlertService,
  ) {
  }

  ngOnInit() {
    if((this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="5") || (localStorage.getItem("finance-orderDetails")!="true")){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    if ('SelectedCustomer' in localStorage) {
      this.SelectedCustomer = JSON.parse(localStorage.getItem('SelectedCustomer'));
    }
    if ('SelectedProduct' in localStorage) {
      this.SelectedProduct = JSON.parse(localStorage.getItem('SelectedProduct'));
    }

    this.financeForm = this.formBuilder.group({     
      comments: [ '', [
        Validators.required,
        Validators.maxLength(255)
      ]]
    });
  }

  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  SelectProduct(obj) {
    // console.log(obj);
    localStorage.setItem("SelectedProduct", JSON.stringify(obj));
    this._router.navigate(['/document_upload']);
  }
  LogOut() {
    // console.log("logout")
    this._router.navigate(['/']);
  }

  goBack() {
    // console.log("logout")
    this._router.navigate(['/finance-customerList']);
  }

  ApproveBtn() {
    this.formSubmitted = true;    
    if (this.financeForm.invalid) {
      Object.keys(this.financeForm.controls).forEach(key => {
        let target = this.financeForm.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please type any comments!');
      return;
    }

    let comments = this.financeForm.get('comments').value;
    let UserID=UserDetailsModel.getState().ID;

    this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="SentToDriver";
    // console.log(this.SelectedCustomer);
    localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));

    this._loadingService.start();
    this._customerService.financeSubmit({ReturnID: this.SelectedProduct.ReturnID, comments, UserID, Accept: true}, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Oops, something went wrong!');
        return;
      }
      
      this._alertService.success('Item sent to driver for pickup!');
      this._router.navigate(['/finance-customerList']);
    });
  }

  RejectBtn() {
    this.formSubmitted = true;    
    if (this.financeForm.invalid) {
      Object.keys(this.financeForm.controls).forEach(key => {
        let target = this.financeForm.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please type any comments!');
      return;
    }

    let comments = this.financeForm.get('comments').value;
    let UserID=UserDetailsModel.getState().ID;

    this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="Rejected_Finance";
    // console.log(this.SelectedCustomer);
    localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));

    this._loadingService.start();
    this._customerService.financeSubmit({ReturnID: this.SelectedProduct.ReturnID, comments, UserID, Accept: false}, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Oops, something went wrong!');
        return;
      }
      
      this._alertService.success('Rejected!!!');
      this._router.navigate(['/finance-customerList']);
    });
  }

}
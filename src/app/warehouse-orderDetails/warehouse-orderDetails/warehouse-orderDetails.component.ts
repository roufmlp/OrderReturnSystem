import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


// Models

// Services
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { CustomerService } from 'src/app/_services/customer/customer.service';
import { AlertService } from 'src/app/_services/alert/alert.service';

declare const $: any;

@Component({
  selector: 'app-warehouse-orderDetails',
  templateUrl: './warehouse-orderDetails.component.html',
  styleUrls: ['./warehouse-orderDetails.component.css'],
})
export class WarehouseOrderDetailsComponent implements OnInit, AfterViewInit {
  // CustomerDetails: PersonalDetailsModel[];
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  CustomerDetails: Array<OrderDetailsModel> = [];
  SelectedCustomer: OrderDetailsModel;
  SelectedProduct: ProductDetailsModel;

  warehouseForm:FormGroup;
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
    if((this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="4") || (localStorage.getItem("warehouse-orderDetails")!="true")){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    if ('SelectedCustomer' in localStorage) {
      this.SelectedCustomer = JSON.parse(localStorage.getItem('SelectedCustomer'));
    }
    if ('SelectedProduct' in localStorage) {
      this.SelectedProduct = JSON.parse(localStorage.getItem('SelectedProduct'));
    }

    this.warehouseForm = this.formBuilder.group({     
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
    this._router.navigate(['/warehouse-customerList']);
  }

  ApproveBtn() {
    this.formSubmitted = true;    
    if (this.warehouseForm.invalid) {
      Object.keys(this.warehouseForm.controls).forEach(key => {
        let target = this.warehouseForm.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please type any comments!');
      return;
    }

    let comments = this.warehouseForm.get('comments').value;
    let UserID=UserDetailsModel.getState().ID;

    this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="SentToFinance";
    // console.log(this.SelectedCustomer);
    localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));

    this._loadingService.start();
    this._customerService.warehouseSubmit({ReturnID: this.SelectedProduct.ReturnID, comments, UserID, Accept: true}, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Oops, something went wrong!');
        return;
      }
      this._alertService.success('Item sent for Finance Approval!');
      this._router.navigate(['/warehouse-customerList']);
    });
  }

  RejectBtn() {
    this.formSubmitted = true;    
    if (this.warehouseForm.invalid) {
      Object.keys(this.warehouseForm.controls).forEach(key => {
        let target = this.warehouseForm.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please type any comments!');
      return;
    }

    let comments = this.warehouseForm.get('comments').value;
    let UserID=UserDetailsModel.getState().ID;

    this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="Rejected_Warehouse";
    // console.log(this.SelectedCustomer);
    localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));

    this._loadingService.start();
    this._customerService.warehouseSubmit({ReturnID: this.SelectedProduct.ReturnID, comments, UserID, Accept: false}, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Oops, something went wrong!');
        return;
      }
      
      this._alertService.success('Rejected!!!');
      this._router.navigate(['/warehouse-customerList']);
    });
  }

}
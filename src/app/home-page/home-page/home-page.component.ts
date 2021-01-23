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
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})


export class HomePageComponent implements OnInit, AfterViewInit {
  
  // Pages:Array<PageClass>=[];
  Pages: GlobalModel[]=GlobalModel.getState();
  UserDetails:UserDetailsModel=UserDetailsModel.getState();

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private _loadingService: LoadingService,
    private _alertService: AlertService,
  ) {
  }


  ngOnInit() {
    this._loadingService.stop();
    this.UserDetails=UserDetailsModel.getState();
    // debugger;
    if(this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="2"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }
    else if(this.UserDetails.RoleID=="1"){
      this.Pages[0]=new GlobalModel({title:"New Order Return",code:"new-orederReturn"});
      this.Pages[1]=new GlobalModel({title:"New User Access",code:"new-userAccess"});
      
      this.Pages[2]=new GlobalModel({title:"Driver",code:"driver-customerList"});
      this.Pages[3]=new GlobalModel({title:"Warehouse",code:"warehouse-customerList"});
      this.Pages[4]=new GlobalModel({title:"Finance",code:"finance-customerList"});
      this.Pages[5]=new GlobalModel({title:"Return Status",code:"status-details"});
      this.Pages[6]=new GlobalModel({title:"Reports",code:"WIP"});
    }
    else if(this.UserDetails.RoleID=="2"){
      this.Pages[0]=new GlobalModel({title:"New Order Return",code:"new-orederReturn"});      
      this.Pages[1]=new GlobalModel({title:"Return Status",code:"status-details"});
    }
    
  }

  PageSelected(obj){
    if(obj.code=="WIP"){
      this._alertService.error("Work In Progress!!")
    }
    else{
      this._loadingService.start();
      this._router.navigate([obj.code]);
    }    
  }
  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }

  
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  

}
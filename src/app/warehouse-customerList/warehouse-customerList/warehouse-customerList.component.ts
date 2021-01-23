import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';


// Services
import {CustomerService} from '../../_services/customer/customer.service';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { LoadingService } from 'src/app/_services/loading/loading.service';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';


@Component({
  selector: 'app-warehouse-customerList',
  templateUrl: './warehouse-customerList.component.html',
  styleUrls: ['./warehouse-customerList.component.css'],
})
export class WarehouseCustomerListComponent implements OnInit, AfterViewInit {

  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  
  CustomerDetails: Array<OrderDetailsModel> = [];
  filteredCustomerDetails: Array<OrderDetailsModel> = [];
  txtSearch:String="";
  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private _alertService: AlertService,
    private _loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.txtSearch="";
    localStorage.removeItem("SelectedCustomer");
    localStorage.removeItem("SelectedProduct");
    localStorage.removeItem("warehouse-orderDetails");
    this._loadingService.start();
    if(this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="4"){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    // console.log("Begin");
    this._loadingService.start();
    this._customerService.WharehouseList(this.UserDetails).subscribe((res: any) => {
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
    // this._loadingService.stop();
    
    // console.log("Customer List");
    // console.log("Customer List",this.CustomerDetails);
    
  }

  ngOnChanges(): void {
  }

  ngAfterViewInit() {
    

  }

  txtSearchChanged(newObj){
    
    let txtSearch: string = newObj.toLocaleLowerCase();
    this.CustomerDetails=OrderDetailsModel.getState();
    this.filteredCustomerDetails=this.CustomerDetails.filter(function(el) {       
      debugger;
      if(el.UpdatedBy && el.UpdatedBy.toLocaleLowerCase().includes(txtSearch)) {
        return true;     
      } else if(el.ProductDetails && el.ProductDetails.length>0){
        let filteredProducts:Array<ProductDetailsModel>= el.ProductDetails.filter(function (pr) {
          if((pr.ProductName && pr.ProductName.toLocaleLowerCase().includes(txtSearch)) || (pr.ProductType && pr.ProductType.toLocaleLowerCase().includes(txtSearch)) || (pr.ReasonForReturn && pr.ReasonForReturn.toLocaleLowerCase().includes(txtSearch))){
            return true;
          } else{
            el.ProductDetails = el.ProductDetails.filter(function(el) { return el.ProductName != pr.ProductName; }); 
            // el.ProductDetails.splice(pr.ProductName);
            return false;
          }
        });
        if(filteredProducts && filteredProducts.length>0){
           return true;
        } else {
          return false;
        }
        
        // el.ProductDetails.filter(function(pr) { 
        //     pr.ProductName.toLocaleLowerCase().includes(txtSearch)
        //   });
      }      
      else{ return false;}

      // return ( el.UpdatedBy.toLocaleLowerCase().includes(newObj.toLocaleLowerCase()) || (el.ProductDetails.length>0 && el.ProductDetails.filter(function(pr) { 
      //   pr.ProductName.toLocaleLowerCase().includes(newObj.toLocaleLowerCase())
      // })));
    });
  }

  BoxClicked(customer,products){
    // console.log(obj);
    localStorage.setItem("SelectedCustomer",JSON.stringify(customer));
    localStorage.setItem("SelectedProduct",JSON.stringify(products));
    localStorage.setItem("warehouse-orderDetails","true");
    this._router.navigate(['/warehouse-orderDetails']);
  }
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    this._router.navigate(['/home']);
  }
}
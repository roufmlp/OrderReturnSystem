import {Routes, RouterModule} from '@angular/router';

// import {AuthGuard} from './_guards/auth.guard';
import {AppPreloader} from './app.preloader';


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'home',
    loadChildren: './home-page/home-page.module#HomePageModule',
    // canActivate: [AuthGuard],
    data: {title: 'Home Page'}
  },
  {
    path: 'driver-customerList',
    loadChildren: './driver-customerList/driver-customerList.module#DriverCustomerListModule',
    // canActivate: [AuthGuard],
    data: {title: 'Driver Pending List'}
  },
  {
    path: 'driver-orderDetails',
    loadChildren: './driver-orderDetails/driver-orderDetails.module#DriverOrderDetailsModule',
    // canActivate: [AuthGuard],
    data: {title: 'Driver Order Details'}
  },
  {
    path: 'returnCustomerProduct',
    loadChildren: './returnCustomerProduct/returnCustomerProduct.module#ReturnCustomerProductModule',
    // canActivate: [AuthGuard],
    data: {title: 'Return Customer Product'}
  },
  {
    path: 'new-orederReturn',
    loadChildren: './new-orederReturn/new-orederReturn.module#NewOrederReturnModule',
    // canActivate: [AuthGuard],
    data: {title: 'New Oreder Return'}
  },
  {
    path: 'new-userAccess',
    loadChildren: './new-userAccess/new-userAccess.module#NewUserAccessModule',
    // canActivate: [AuthGuard],
    data: {title: 'New User Access'}
  },
  {
    path: 'warehouse-customerList',
    loadChildren: './warehouse-customerList/warehouse-customerList.module#WarehouseCustomerListModule',
    // canActivate: [AuthGuard],
    data: {title: 'Warehouse Pending List'}
  },
  {
    path: 'warehouse-orderDetails',
    loadChildren: './warehouse-orderDetails/warehouse-orderDetails.module#WarehouseOrderDetailsModule',
    // canActivate: [AuthGuard],
    data: {title: 'Warehouse Order Details'}
  },
  {
    path: 'finance-customerList',
    loadChildren: './finance-customerList/finance-customerList.module#FinanceCustomerListModule',
    // canActivate: [AuthGuard],
    data: {title: 'Finance Pending List'}
  },
  {
    path: 'finance-orderDetails',
    loadChildren: './finance-orderDetails/finance-orderDetails.module#FinanceOrderDetailsModule',
    // canActivate: [AuthGuard],
    data: {title: 'Warehouse Order Details'}
  },
  {
    path: 'document_upload',
    loadChildren: './document-upload/document-upload.module#DocumentUploadModule',
    // canActivate: [AuthGuard],
    data: {title: 'Document Upload'}
  },
  {
    path: 'status-details',
    loadChildren: './status-Details/status-Details.module#StatusDetailsModule',
    // canActivate: [AuthGuard],
    data: {title: 'Document Upload'}
  },  
  {path: '**', redirectTo: ''}
];

export const AppRoutes = RouterModule.forRoot(appRoutes, {useHash: false, preloadingStrategy: AppPreloader});

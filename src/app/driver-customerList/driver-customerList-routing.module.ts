import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DriverCustomerListComponent} from './driver-customerList/driver-customerList.component';

const routes: Routes = [
  {path: '', component: DriverCustomerListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverCustomerListRoutingModule {
}

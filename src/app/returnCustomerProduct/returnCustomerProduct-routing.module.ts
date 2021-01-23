import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReturnCustomerProductComponent} from './returnCustomerProduct/returnCustomerProduct.component';

const routes: Routes = [
  {path: '', component: ReturnCustomerProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnCustomerProductRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FinanceCustomerListComponent} from './finance-customerList/finance-customerList.component';

const routes: Routes = [
  {path: '', component: FinanceCustomerListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceCustomerListRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FinanceOrderDetailsComponent} from './finance-orderDetails/finance-orderDetails.component';

const routes: Routes = [
  {path: '', component: FinanceOrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceOrderDetailsRoutingModule {
}

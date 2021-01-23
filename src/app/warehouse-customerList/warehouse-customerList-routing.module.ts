import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WarehouseCustomerListComponent} from './warehouse-customerList/warehouse-customerList.component';

const routes: Routes = [
  {path: '', component: WarehouseCustomerListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseCustomerListRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WarehouseOrderDetailsComponent} from './warehouse-orderDetails/warehouse-orderDetails.component';

const routes: Routes = [
  {path: '', component: WarehouseOrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseOrderDetailsRoutingModule {
}

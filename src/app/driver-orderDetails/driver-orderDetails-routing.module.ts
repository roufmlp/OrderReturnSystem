import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DriverOrderDetailsComponent} from './driver-orderDetails/driver-orderDetails.component';

const routes: Routes = [
  {path: '', component: DriverOrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverOrderDetailsRoutingModule {
}

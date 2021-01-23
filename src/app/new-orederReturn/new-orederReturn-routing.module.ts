import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewOrederReturnComponent} from './new-orederReturn/new-orederReturn.component';

const routes: Routes = [
  {path: '', component: NewOrederReturnComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOrederReturnRoutingModule {
}

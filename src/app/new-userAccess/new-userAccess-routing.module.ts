import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewUserAccessComponent} from './new-userAccess/new-userAccess.component';

const routes: Routes = [
  {path: '', component: NewUserAccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserAccessRoutingModule {
}

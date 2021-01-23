import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginDetailComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}

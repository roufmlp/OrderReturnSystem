import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LoginDetailComponent } from './login/login.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule
  ],
  declarations: [
    LoginDetailComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    LoginDetailComponent
  ]
})
export class LoginModule {
}

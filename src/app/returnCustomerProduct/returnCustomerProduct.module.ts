import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReturnCustomerProductComponent } from './returnCustomerProduct/returnCustomerProduct.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { ReturnCustomerProductRoutingModule } from './returnCustomerProduct-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    ReturnCustomerProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    ReturnCustomerProductComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    ReturnCustomerProductComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReturnCustomerProductModule {
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DriverCustomerListComponent } from './driver-customerList/driver-customerList.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { DriverCustomerListRoutingModule } from './driver-customerList-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    DriverCustomerListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    DriverCustomerListComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    DriverCustomerListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DriverCustomerListModule {
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DriverOrderDetailsComponent } from './driver-orderDetails/driver-orderDetails.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { DriverOrderDetailsRoutingModule } from './driver-orderDetails-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    DriverOrderDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    DriverOrderDetailsComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    DriverOrderDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DriverOrderDetailsModule {
}

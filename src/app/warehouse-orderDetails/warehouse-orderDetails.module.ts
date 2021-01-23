import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { WarehouseOrderDetailsComponent } from './warehouse-orderDetails/warehouse-orderDetails.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { WarehouseOrderDetailsRoutingModule } from './warehouse-orderDetails-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    WarehouseOrderDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    WarehouseOrderDetailsComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    WarehouseOrderDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarehouseOrderDetailsModule {
}

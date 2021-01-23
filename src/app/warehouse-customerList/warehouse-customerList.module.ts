import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { WarehouseCustomerListComponent } from './warehouse-customerList/warehouse-customerList.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { WarehouseCustomerListRoutingModule } from './warehouse-customerList-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    WarehouseCustomerListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    WarehouseCustomerListComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    WarehouseCustomerListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarehouseCustomerListModule {
}

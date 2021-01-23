import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FinanceCustomerListComponent } from './finance-customerList/finance-customerList.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { FinanceCustomerListRoutingModule } from './finance-customerList-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    FinanceCustomerListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    FinanceCustomerListComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    FinanceCustomerListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinanceCustomerListModule {
}

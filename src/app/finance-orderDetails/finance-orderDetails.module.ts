import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FinanceOrderDetailsComponent } from './finance-orderDetails/finance-orderDetails.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { FinanceOrderDetailsRoutingModule } from './finance-orderDetails-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    FinanceOrderDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    FinanceOrderDetailsComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    FinanceOrderDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinanceOrderDetailsModule {
}

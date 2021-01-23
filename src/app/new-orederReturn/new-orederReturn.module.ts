import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NewOrederReturnComponent } from './new-orederReturn/new-orederReturn.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { NewOrederReturnRoutingModule } from './new-orederReturn-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    NewOrederReturnRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    NewOrederReturnComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    NewOrederReturnComponent
  ]
})
export class NewOrederReturnModule {
}

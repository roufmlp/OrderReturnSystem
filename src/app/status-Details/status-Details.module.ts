import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { StatusDetailsComponent } from './status-Details/status-Details.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { StatusDetailsRoutingModule } from './status-Details-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    StatusDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    StatusDetailsComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    StatusDetailsComponent
  ]
})
export class StatusDetailsModule {
}

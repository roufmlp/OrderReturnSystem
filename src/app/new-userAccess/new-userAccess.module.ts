import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NewUserAccessComponent } from './new-userAccess/new-userAccess.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { NewUserAccessRoutingModule } from './new-userAccess-routing.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    NewUserAccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    NewUserAccessComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    NewUserAccessComponent
  ]
})
export class NewUserAccessModule {
}

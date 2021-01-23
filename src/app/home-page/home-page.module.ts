import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { HomePageComponent } from './home-page/home-page.component';

import { SharedDirectivesModule } from '../_directives/shared-directives.module';
import { HomePageRoutingModule } from './home-page-routing.module';

import {MatAutocompleteModule} from '@angular/material/autocomplete'

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    SharedDirectivesModule,
    MatAutocompleteModule
  ],
  declarations: [
    HomePageComponent,
    // CustomInputForFloatLabelDirective,
  ],
  exports: [
    HomePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {
}

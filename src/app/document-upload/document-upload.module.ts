import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DocumentUploadRoutingModule} from './document-upload-routing.module';
import {DocumentUploadComponent} from './document-upload/document-upload.component';

import {CarouselModule} from 'ngx-bootstrap/carousel';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {ngfModule} from 'angular-file';

import { SharedPipesModule } from "../_pipes/shared-pipes.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DocumentUploadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CarouselModule.forRoot(),
    DragAndDropModule.forRoot(),
    ngfModule,
    BsDatepickerModule.forRoot(),
    SharedPipesModule,
    SharedModule
  ],
  declarations: [
    DocumentUploadComponent,
  ],
  exports: []
})
export class DocumentUploadModule {
}

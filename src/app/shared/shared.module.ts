import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploaderComponent } from "./file uploader/file-uploader.component";
import { SharedPipesModule } from "../_pipes/shared-pipes.module";

@NgModule({
  imports: [
    CommonModule,
    SharedPipesModule
  ],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent]
})
export class SharedModule { }

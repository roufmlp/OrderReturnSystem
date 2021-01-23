import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipe } from "./safe-html.pipe";
import { MobileNumberPipe } from './mobile-number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafePipe,
    MobileNumberPipe
  ],
  exports: [
    SafePipe,
    MobileNumberPipe
  ]
})
export class SharedPipesModule { }

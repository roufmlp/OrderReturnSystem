import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDefaultValueDirective } from './input-default-value.directive';
import { FloatingLabelDirective } from './floating-label.directive';
import { AllowedCharsDirective } from './allowed-chars.directive';
import { DisableControlDirective } from "./disable-control.directive";
// import { PreventedCharsDirective } from './prevented-chars.directive';
// import { CustomTooltipDirective } from './custom-tooltip.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputDefaultValueDirective,
    FloatingLabelDirective,
    AllowedCharsDirective,
    DisableControlDirective,
    // PreventedCharsDirective,
    // CustomTooltipDirective
  ],
  exports: [
    InputDefaultValueDirective,
    FloatingLabelDirective,
    AllowedCharsDirective,
    DisableControlDirective,
    // CustomTooltipDirective
  ]
})
export class SharedDirectivesModule { }

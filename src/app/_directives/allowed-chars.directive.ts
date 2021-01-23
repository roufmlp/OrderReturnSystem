import { Directive, ElementRef, OnInit, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[allowedChars]'
})
export class AllowedCharsDirective implements OnInit {
  @Input() allowedChars: string;
  allowedCharsRegExp: RegExp;

  // modifier means cmd/control/meta, shift, alt
  modifierPressed: boolean = false;

  @HostListener('keyup', ["$event"]) onKeyUp(keyEvent: KeyboardEvent) {
    if (this.modifierPressed){
      this.modifierPressed = !this.modifierPressed;
    }
  }
  @HostListener('keydown', ["$event"]) onKeyDown(keyEvent: KeyboardEvent) {
    if(
      keyEvent.key === 'Control' ||
      keyEvent.key === 'Meta' ||
      keyEvent.key === 'Alt' ||
      keyEvent.key === 'Shift'
    ){
      this.modifierPressed = true;
    };
    let valueAllowed = this.isValueAllowed(keyEvent, this.allowedCharsRegExp);
    if (
      !valueAllowed && 
      !(
        keyEvent.key === 'Backspace' ||
        keyEvent.key === 'Delete' ||
        keyEvent.key === 'Tab' ||
        keyEvent.key === 'ArrowLeft' ||
        keyEvent.key === 'ArrowRight'
      ) && 
      !this.modifierPressed
    ){
      keyEvent.preventDefault();
    }
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.allowedCharsRegExp = new RegExp(this.allowedChars);
  };

  isValueAllowed(keyEvent: KeyboardEvent, allowedCharsRegExp: RegExp) {
    let value = (<HTMLInputElement>keyEvent.target).value + keyEvent.key;
    let regExp = allowedCharsRegExp;
    return regExp.test(value);
  }
}

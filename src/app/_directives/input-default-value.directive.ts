import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[inputDefaultValue]'
})
export class InputDefaultValueDirective implements OnInit {
  @Input() inputDefaultValue: string;
  @HostListener('keydown', ['$event']) onKeyDown(inputEvent) {
    this.preventDefaultValueChange(inputEvent, this.inputDefaultValue.toString(), true);
  }
  @HostListener('keyup', ['$event']) onKeyUp(inputEvent) {
    this.getLastInputValue(inputEvent);
  }
  lastInputValue: string;
  errorColor: string = 'rgb(255, 85, 0)'

  constructor(private el: ElementRef, private rederer: Renderer2) {
  }

  ngOnInit() {
    this.lastInputValue = this.inputDefaultValue;
    if(!this.el.nativeElement.value){
      this.rederer.setProperty(this.el.nativeElement, 'value', this.inputDefaultValue)
    }
  }

  preventDefaultValueChange(inputEvent: Event, defaultValue: string, isStartWithDefault: boolean) {
    if (isStartWithDefault) {
      if (this.lastInputValue === defaultValue) {
        if((<KeyboardEvent>inputEvent).key === 'Backspace' || (<KeyboardEvent>inputEvent).key === 'Delete'){
          inputEvent.preventDefault();
          this.el.nativeElement.style.color = this.errorColor;
        }
      }
    } else {
      if ((<HTMLInputElement>inputEvent.target).value.indexOf(defaultValue) > -1) {
      } else {
        inputEvent.preventDefault();
      }
    }
  }

  getLastInputValue(inputEvent: Event) {
    this.lastInputValue = (<HTMLInputElement>inputEvent.target).value;
    if(this.el.nativeElement.style.color === this.errorColor){
      this.el.nativeElement.style.color = '#4a4a4a';
    }
  }

}

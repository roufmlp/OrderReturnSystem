import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

interface LabelInput {
  label: HTMLElement;
  input: HTMLInputElement;
}

@Directive({
  selector: '[floatingLabel]'
})
export class FloatingLabelDirective implements OnInit {
  labelInputArray: LabelInput[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    // this.labelInputArray = this.getAllLabelAndInputs(this.el.nativeElement);
    // console.log('this.labelInputArray ', this.labelInputArray );
    
    // for (let i = 0; i < this.labelInputArray.length; i++) {
    //   const labelInput: LabelInput = this.labelInputArray[i];
    //   this.setAllEventsOnInput(labelInput);
    // }
  }

  ngAfterViewInit(): void {
    this.labelInputArray = this.getAllLabelAndInputs(this.el.nativeElement);
    // console.log('this.labelInputArray ', this.labelInputArray );
    
    for (let i = 0; i < this.labelInputArray.length; i++) {
      const labelInput: LabelInput = this.labelInputArray[i];
      this.setAllEventsOnInput(labelInput);
    }
    for (let i = 0; i < this.labelInputArray.length; i++) {
      const labelInput: LabelInput = this.labelInputArray[i];
      this.addStyleIfInputFilled(labelInput);
      // this.addStyleIfInputFilled(labelInput);
    }
  }

  getAllLabelAndInputs(formElement: Element): LabelInput[] {
    // console.log('formElement', formElement);
    
    let labelAndInputArr: LabelInput[] = []
    let labels = formElement.querySelectorAll('label');
    // console.log('labels', labels);
    // console.log('doc label', document.querySelectorAll('label'));
    
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      let input:HTMLInputElement = label.parentElement.querySelector('ng-select');
      if(!input) {
        input = label.parentElement.querySelector('input');
      }
      labelAndInputArr.push({ input, label });
    };
    return labelAndInputArr
  }

  setAllEventsOnInput(labelInput: LabelInput) {
    if (labelInput.input.tagName === 'NG-SELECT') {
      let ngSelectInput = labelInput.input.querySelector('input');
      this.renderer.listen(ngSelectInput, 'focus', () => {
        // console.log('focus');
        this.focusedInputStyle(labelInput.label);
        this.filledInputStyle(labelInput.label);
      })
      this.renderer.listen(ngSelectInput, 'blur', () => {
        // console.log('blur');
        this.notFocusedInputStyle(labelInput.label);
        this.addStyleIfInputFilled(labelInput);
      })
    } else if (labelInput.input.attributes.getNamedItem('bsdatepicker')){
      // console.log(labelInput.input);
      this.renderer.listen(labelInput.input, 'focus', () => {
        this.focusedInputStyle(labelInput.label);
        this.filledInputStyle(labelInput.label);
      })
      this.renderer.listen(labelInput.input, 'blur', () => {
        // console.log('blur started');
        setTimeout(() => {
          // console.log('blur exe');
          this.notFocusedInputStyle(labelInput.label);
          this.addStyleIfInputFilled(labelInput);
        }, 10);
      })
    } else {
      // console.log('asdzxc');
      
      this.renderer.listen(labelInput.input, 'focus', () => {
        // console.log('focus');
        this.focusedInputStyle(labelInput.label);
        this.filledInputStyle(labelInput.label);
      })
      this.renderer.listen(labelInput.input, 'blur', () => {
        // console.log('blur');
        this.notFocusedInputStyle(labelInput.label);
        this.addStyleIfInputFilled(labelInput);
      })
      this.renderer.listen(labelInput.input, 'keyup', () => {
        // console.log('keyup');
        this.filledInputStyle(labelInput.label);
      })
      this.renderer.listen(labelInput.input, 'change', () => {
        // console.log('change');
        this.filledInputStyle(labelInput.label);
      })
      this.renderer.listen(labelInput.input, 'input', () => {
        // console.log('input');
        this.filledInputStyle(labelInput.label);
      })
    }
  }

  addStyleIfInputFilled(labelInput: LabelInput) {
    setTimeout(() => {
      this.isInputFilled(labelInput.input) ? this.filledInputStyle(labelInput.label) : this.notFilledInputStyle(labelInput.label);
    }, 100);
  }

  isInputFilled(input: HTMLInputElement): boolean {
      // console.log(input.value);
      if(input.tagName === "NG-SELECT"){  
        return input.querySelector('.ng-value-label').innerHTML ? true : false;
      } else {
        return input.value ? true : false;
      }
  }

  notFilledInputStyle(label: HTMLElement) {
    label.style.transform = 'translate(0, calc(50% - (1rem / 1.3)))';
    label.style.fontSize = '1rem';
  }

  filledInputStyle(label: HTMLElement) {
    label.style.transform = 'translate(0, 9px)';
    label.style.fontSize = '.7rem';
  }

  notFocusedInputStyle(label: HTMLElement) {
    label.style.color = '#9b9b9b';
    label.style.fontWeight = '400';
  }
  focusedInputStyle(label: HTMLElement) {
    label.style.color = '#161e6d';
    label.style.fontWeight = '700';
  }

}

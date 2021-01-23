import {Component, EventEmitter, Output, SimpleChanges, OnChanges, Input, ViewChild, ElementRef} from '@angular/core';

import {SafePipe} from '../../_pipes/safe-html.pipe';


@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  inputs: ['activeColor', 'baseColor', 'overlayColor', 'content', 'type', 'base64', 'backgroundImg']
})
export class FileUploaderComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  iconColor: string;
  borderColor: string;
  content: boolean = true;

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  // type = "IMAGE";
  base64 = false;
  isTxt = false;
  @Input() type: string = '';
  @Input() backgroundImg: string = '';

  @Output()
  imageUploaded: EventEmitter<String> = new EventEmitter<String>(); //creating an output event

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log('backgroundImg', this.backgroundImg);

  }

  handleClick(event) {
    event.target.value = null;
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
    this.iconColor = this.overlayColor;
  }

  handleInputFocus(event) {
    event.preventDefault();
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (!this.base64) {
      this.imageUploaded.emit(file); //emmiting the event.
    }
    var pattern = /image-*/;
    var reader = new FileReader();

    if (this.type == 'IMAGE' && (!file.type.match(pattern))) {
      alert('invalid format'); // orange alert
      return;
    }

    // if (this.type=="ALL" ) {
    //     this.isTxt = true;
    //     //return;
    // }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.loaded = true;
    this.imageSrc = reader.result;
    if (this.base64) {
      this.imageUploaded.emit(this.imageSrc);
    }
  }

  _setActive() {
    this.borderColor = this.activeColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.activeColor;
    }
  }

  _setInactive() {
    this.borderColor = this.baseColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.baseColor;
    }
  }

  clearinput() {
    this.imageLoaded = false;
    this.imageSrc = '';
    this.loaded = false;
    this.imageUploaded.emit(null);
  }

  uploadTrigger(input) {
    // console.log('input', input);
    if (input.nativeElement) {
      input.nativeElement.click();
    } else {
      input.click();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.backgroundImg);

    if (changes['content']) {
      if (changes['content'].currentValue == false) {
        this.clearinput();
      }
    }
  }
}

import {Component, ElementRef, Input, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import 'jquery';
import 'bootstrap';


// Services
import {AlertService} from '../../_services/alert/alert.service';
import {LoadingService} from '../../_services/loading/loading.service';
import {CustomerService} from '../../_services/customer/customer.service';
import {DataService} from '../../_services/data/data.service';
import {Config} from '../../app.config';
import { OrderDetailsModel } from 'src/app/_models/order-details-model';
import { ProductDetailsModel } from 'src/app/_models/product-details-model';
import { UserDetailsModel } from 'src/app/_models/user-details-model';


interface CustomFilesInterface {
  file: File;
  target: string;
  name: string;
}

class DocGlobalObject {
  progressValue: number = 0;
  inProcess: boolean = false;
  model: any = null;
  array: CustomFilesInterface[] = [];
  reader: FileReader = new FileReader();
}

interface DocChild {
  type: string;
  title: string;
  name: string;
  isActive: boolean;
  object: DocGlobalObject;
}

interface DocsModel {
  title: string;
  name: string;
  isActive: boolean;
  children: DocChild[];
}

declare const $: any;


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  UserDetails:UserDetailsModel=UserDetailsModel.getState();
  CustomerDetails: Array<OrderDetailsModel> = [];
  SelectedCustomer:OrderDetailsModel;
  SelectedProduct:ProductDetailsModel;
  formSubmitted: boolean = false;
  
  docsUpload: FormGroup;

  txtreturnReason:string="";
  
  eidFrontUploaded: boolean;
  eidBackUploaded: boolean;
  passportFrontUploaded: boolean;
  passportBackUploaded: boolean;
  numberOfSubmitAttempts: number = 0;
  initEidFrontHintShow = true;
  initEidBackHintShow = true;
  initPassMainHintShow = true;

  // @ViewChild('f', {read: NgForm}) f: NgForm;
  @ViewChild('f') f: NgForm;
  formClassName: string = 'needs-validation';


  @Input('totalNumberForDocuments') totalNumberForDocuments: number = 0;

  currentRemoveFileData: { index: number, childIndex: number, fileIndex: number } = {
    index: 0,
    childIndex: 0,
    fileIndex: 0
  };

  currentCancelFile: any = null;

  ThinIncomeDocsRequired: boolean = false;

  DocsList: DocsModel[] = [];

  images: Array<{ title: string, image: any }> = [];

  docs: { image: string, title: string }[] = [];

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    if((this.UserDetails.RoleID!="1" && this.UserDetails.RoleID!="3") || (localStorage.getItem("document_upload")!="true")){
      this._router.navigate(['/']);
      this._alertService.error("Access Denied!!!")
    }

    if('SelectedCustomer' in localStorage){
      this.SelectedCustomer = JSON.parse(localStorage.getItem('SelectedCustomer'));
    }
    if('SelectedProduct' in localStorage){
      this.SelectedProduct = JSON.parse(localStorage.getItem('SelectedProduct'));
    }


    this.docsUpload = this.formBuilder.group({     
      returnReason: [ '', [
        Validators.required,
        Validators.maxLength(255)
      ]]
    });    


    try {
      // this.mixpanelService.track('Product page init');
    } catch (error) {
    }
    this.manageSelectedProduct();
    this.setDocsData();
    this.initialize();
  }

  SelectProduct(obj){
    // console.log(obj);
    this._router.navigate(['/returnCustomerProduct']);
  }
  LogOut(){
    // console.log("logout")
    this._router.navigate(['/']);
  }
  goBack(){
    // console.log("logout")
    this._router.navigate(['/driver-orderDetails']);
  }

  allowedFormatValidator(allowedChars: RegExp, errorName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isInputValueValid = allowedChars.test(control.value);
      return isInputValueValid ? null : {[errorName.toString()]: {value: control.value}};
    };
  }
  
  fileUploaded(event: string, docType: string) {
    // console.log('event', event);
    let title: string;
    if (event) {
      let extentionArr: any = event.toString().match(/(?:data:image\/)([a-z]+)(?:;base64,)/);
      let ext;
      if (extentionArr.length) {
        ext = extentionArr[1];
      }
      // console.log('ext', ext);

      if (docType === 'pic01_') {
        title = this.SelectedProduct.ReturnID + '_pic01' + '.' + ext;
        this.eidFrontUploaded = (docType === 'pic01_') && event ? true : false;
      } else if (docType === 'pic02_') {
        title = this.SelectedProduct.ReturnID + '_pic02' + '.' + ext;
        this.eidBackUploaded = (docType === 'pic02_') && event ? true : false;
      }
      this.docs.push({image: event, title});
    } else {
      if (docType === 'pic01_') {
        title = this.SelectedProduct.ReturnID + '_pic01';
        this.eidFrontUploaded = (docType === 'pic01_') && event ? true : false;
      } else if (docType === 'pic02_') {
        title = this.SelectedProduct.ReturnID + '_pic02';
        this.eidBackUploaded = (docType === 'pic02_') && event ? true : false;
      } 
      for (let i = 0; i < this.docs.length; i++) {
        const doc = this.docs[i];
        if (doc && doc.title.indexOf(title) > -1) {
          // let indexOfObj = this.docs.findIndex(obj => obj.title.indexOf(title) > -1);
          this.docs.splice(i, 1);
        }
      }

    }
    // console.log('this.docs', this.docs);

  }

  initialize() {
  }

  private manageSelectedProduct(): void {
    let selectedProduct: any = null;
    if (JSON.parse(localStorage.getItem('selectedProduct')) != null) {
      selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    }
    if (selectedProduct != null) {
      this.ThinIncomeDocsRequired = selectedProduct.ThinIncomeDocsRequired;
    }
  }

  private setDocsData(): void {
    // if (JSON.parse(localStorage.getItem('DocsList')) != null) {
    //   this.DocsList = JSON.parse(localStorage.getItem('DocsList'));
    // } else {
    this.DocsList = [
      // {
      //   title: 'Signed Application Form',
      //   name: 'SAF',
      //   isActive: true,
      //   children: [
      //     {
      //       type: 'SignedApplicationForm',
      //       title: 'Signed Application Form',
      //       name: 'SIGNEDAPPLICATIONFORM',
      //       isActive: true,
      //       object: new DocGlobalObject()
      //     }
      //   ]
      // },
      {
        title: 'Passport',
        name: 'PP',
        isActive: true,
        children: [
          {
            type: 'passport',
            title: 'Passport ID',
            name: 'PASSPORT',
            isActive: true,
            object: new DocGlobalObject()
          }
        ]
      },
      {
        title: 'Emirates ID',
        name: 'EID',
        isActive: true,
        children: [
          {
            type: 'emiratesID_Front',
            name: 'FRONT',
            title: 'Front Side',
            isActive: true,
            object: new DocGlobalObject()
          },
          {
            type: 'emiratesID_Back',
            name: 'BACK',
            title: 'Back Side',
            isActive: true,
            object: new DocGlobalObject()
          }
        ]
      },      
    ];
    // }
  }

  private removeString(strToReplace: string) {
    return strToReplace.replace(/^data:image\/[a-z]+;base64,/, '');
  }

  readUrlUpdated(event: any, index: number = 0, childIndex: number = 0) {
    if (event.target.files && event.target.files[0]) {
      const object = this.DocsList[index].children[childIndex].object;
      object.inProcess = true;
      object.reader = new FileReader();
      object.reader.onprogress = (e: any) => {
        if (e.lengthComputable) {
          object.progressValue = Math.floor((e.loaded / e.total) * 100);
        }
      };
      object.reader.onabort = (e: any) => {
        object.inProcess = false;
        object.progressValue = 0;
      };
      object.reader.onload = (e: any) => {
        const file = event.target.files[0];
        const filterArray = () => object.array.length > 0 ? Math.max.apply(Math, object.array.map(o => o.name.split('_')[2])) : 0;
        object.array.push({
          file,
          target: e.target.result,
          name: `${this.DocsList[index].name}_${this.DocsList[index].children[childIndex].name}_${(filterArray() + 1)}_${((new Date()).getTime())}.${file['name'].split('.').pop()}`
        });
        event.target.value = '';
        object.inProcess = false;
      };
      object.reader.readAsDataURL(event.target.files[0]);
    }
  }


  private filesToUpload(): CustomFilesInterface[] {
    const files: CustomFilesInterface[] = [];
    if (this.DocsList && this.DocsList.length > 0) {
      for (let i = 0; i < this.DocsList.length; i++) {
        const children: DocChild[] = this.DocsList[i].children;
        if (children && children.length > 0) {
          for (let x = 0; x < children.length; x++) {
            const array: CustomFilesInterface[] = children[x].object.array;
            if (array && array.length > 0) {
              for (let z = 0; z < array.length; z++) {
                files.push(array[z]);
              }
            }
          }
        }
      }
    }
    return files;
  }


  removeDocUpdated(index: number = 0, childIndex: number = 0, fileIndex: number = 0) {
    $('#deleteFileModal').modal('show');
    this.currentRemoveFileData = {
      index,
      childIndex,
      fileIndex
    };
  }

  removeDoc2() {
    this.DocsList[this.currentRemoveFileData.index].children[this.currentRemoveFileData.childIndex].object.array.splice(this.currentRemoveFileData.fileIndex, 1);
  }

  cancelFileUpdated(index: number = 0, childIndex: number = 0) {
    $('#cancelFileModal').modal('show');
    this.currentCancelFile = {index, childIndex};
  }


  cancelDoc2() {
    const object = this.DocsList[this.currentCancelFile.index].children[this.currentCancelFile.childIndex].object;
    if (!object.inProcess) {
      // uploaded
      this.currentRemoveFileData = {
        index: this.currentCancelFile.index,
        childIndex: this.currentCancelFile.childIndex,
        fileIndex: object.array.length
      };
      this.removeDoc2();
    } else {
      this.DocsList[this.currentCancelFile.index].children[this.currentCancelFile.childIndex].object.reader.abort();
    }
    this.currentCancelFile = null;
  }

  setImageFile(file) {
    $('#globalImage').attr('src', file);
  }

  droppedUpdated(files: File[] = null, index: number = 0, childIndex: number = 0): void {
    if (files instanceof Array) {
      this.readUrlUpdated({target: {files}, value: ''}, index, childIndex);
    }
  }

  private getObject(name: string = '', type: string = ''): DocChild {
    if (this.DocsList.length > 0 && name && type) {
      for (let i = 0; i < this.DocsList.length; i++) {
        if (name === this.DocsList[i].name) {
          const children = this.DocsList[i].children;
          for (let x = 0; x < children.length; x++) {
            if (type === children[x].type) {
              return children[x];
            }
          }
        }
      }
      return this.DocsList[0].children[0];
    }
    return {
      type: '',
      title: '',
      name: '',
      isActive: true,
      object: new DocGlobalObject()
    };
  }

  showEidFrontModal(event) {
    // event.stopPropagation();
    if (this.initEidFrontHintShow) {
      this.initEidFrontHintShow = false;
    }
    $('#eidFrontModal').modal('show');
  }

  showEidBackModal(event) {
    // event.stopPropagation();
    if (this.initEidBackHintShow) {
      this.initEidBackHintShow = false;
    }
    $('#eidBackModal').modal('show');
  }

  showPassMainModal(event) {
    // event.stopPropagation();
    if (this.initPassMainHintShow) {
      this.initPassMainHintShow = false;
    }
    $('#passMainModal').modal('show');
  }



  submitDocumentUploadNone() {
   // if (this.numberOfSubmitAttempts >= 2) {
      this._router.navigate(['/personal_details']);
   // }
  }

  submitDocumentUpload(): void {
    // debugger;

    this.formSubmitted = true;    
    if (this.docsUpload.invalid) {
      Object.keys(this.docsUpload.controls).forEach(key => {
        let target = this.docsUpload.get(key);
        if (target.invalid) {
          $('#' + key).focus();
        }
      });
      this._alertService.error('Please type any comments!');
      return;
    }

    let ReasonForReturn = this.docsUpload.get('returnReason').value;
    let UserID=UserDetailsModel.getState().ID;

    // this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="SentToWarehouse";
    // console.log(this.SelectedCustomer);
    // localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));
    // this._router.navigate(['/driver_returnCustomerMain']);

    if (this.docs.length < 1) {
      this._alertService.error('Please upload atleast one pic of the product');
      return;
    }
    this.docs = this.docs.map(doc => {
      return {
        ...doc,
        image: this.removeString(doc.image)
      };
    });
    
    this._loadingService.start();
    this._customerService.uploadDocuments({RefNo: this.SelectedProduct.ReturnID, ReasonForReturn, UserID, UploadImages: this.docs}, true).subscribe((res: any) => {
      this._loadingService.stop();
      if(!res){
        this._alertService.error('Please upload a valid picture!');
        return;
      }
      if(res!="success"){
        this._alertService.error('Image size is over 5MB, try to compress the file before loading!');
        return;
      }
      this._alertService.success('Item Sent for Approval!');
      this.SelectedCustomer.ProductDetails.find(x=>x.ID==this.SelectedProduct.ID).Status="SentToWarehouse";
      // console.log(this.SelectedCustomer);
      localStorage.setItem("SelectedCustomer",JSON.stringify(this.SelectedCustomer));
      this._router.navigate(['/driver-orderDetails']);
    });
    // this.numberOfSubmitAttempts++;
  }

  doSomething(event) {

  }


}

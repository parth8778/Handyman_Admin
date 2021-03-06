import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../../services/data.service';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilService } from '../../../services/util.service';
import messages from '../../../messages/messages';
@Component({
  templateUrl: 'add-service.component.html',
  selector: 'action-service'
})
export class AddServiceComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @Input() btnText = '';
  categories = [];
  serviceForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dataService: DataService,
    private utilService: UtilService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  } 

  initForm() { 
    this.serviceForm = this.builder.group({
      serviceName: ['', Validators.required],
      serviceId: [this.firebaseService.fireStore.createId(), Validators.required],
      categoryId: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      enabled: [true, Validators.required]
    });
  }
 
  getCategories() {
    this.dataService.categories.subscribe((res) => {
      if(res) {
        this.categories = res;
      }
    });
  }
 
  addService() {
    this.utilService.startLoader();
    if (this.serviceForm.valid) {
      const request = {
        ...this.serviceForm.value,
        docId: this.serviceForm.value.serviceId
      }
      this.firebaseService.addDataToCollection('services', request).then(() => {
         this.utilService.stopLoader();
         this.utilService.showSuccessToast(messages.successTitle, messages.addServiceSuccess);
         this.initForm();
         this.myModal.hide();
      }).catch((err) => {
        this.utilService.showErrorToast(messages.errorTitle, messages.somethingWentWrong);
        this.utilService.stopLoader();
      });
    }
  }
}

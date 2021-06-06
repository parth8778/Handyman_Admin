import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../../services/data.service';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilService } from '../../../services/util.service';
import messages from '../../../messages/messages';

@Component({
  templateUrl: 'edit-service.component.html',
  selector: 'edit-service'
})
export class EditServiceComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @Input() service = null;
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
      serviceName: [this.service['serviceName'], Validators.required],
      serviceId: [this.service['serviceId'], Validators.required],
      categoryId: [this.service['categoryId'], Validators.required],
      serviceDescription: [this.service['serviceDescription'], Validators.required],
      enabled: [this.service['enabled'], Validators.required]
    });
  }
 
  getCategories() {
    this.dataService.categories.subscribe((res) => {
      if(res) {
        this.categories = res;
      }
    });
  }
 
  editService() {
    this.utilService.startLoader();
    if (this.serviceForm.valid) {
      const docId = this.serviceForm.value.serviceId;
      this.firebaseService.addOrUpdateCollection('services', this.serviceForm.value, docId).then(() => {
         this.utilService.stopLoader();
         this.utilService.showSuccessToast(messages.successTitle, messages.updateServiceSuccess);
         this.initForm();
         this.myModal.hide();
      }).catch((err) => {
        this.utilService.showErrorToast(messages.errorTitle, messages.somethingWentWrong);
        this.utilService.stopLoader();
        console.log('err: ', err);
      });
    }
  }
}

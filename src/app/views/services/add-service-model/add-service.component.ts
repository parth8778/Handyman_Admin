import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../../services/data.service';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilService } from '../../../services/util.service';

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
    this.getCategories();
    this.serviceForm = this.builder.group({
      serviceName: ['', Validators.required],
      serviceId: [this.firebaseService.fireStore.createId(), Validators.required],
      categoryId: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      enabled: ['', Validators.required]
    });
  } 
 
  getCategories() {
    this.dataService.categories.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
        this.categories = res;
      }
    });
  }

 
  addService() {
    this.utilService.startLoader();
    if (this.serviceForm.valid) {
      console.log("this.serviceForm.value: ", this.serviceForm.value);
      this.firebaseService.addDataToCollection('services', this.serviceForm.value).then((res) => {
        if (res) {
          this.utilService.stopLoader();
          this.utilService.showSuccessToast('Success', 'Service added successfully...');
          this.myModal.hide();
        }
      }).catch((err) => {
        this.utilService.showErrorToast('Error', 'Something went wrong...');
        this.utilService.stopLoader();
        console.log('err: ', err);
      });
    }
  }
}

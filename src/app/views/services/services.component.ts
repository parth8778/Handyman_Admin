import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';
@Component({
  templateUrl: 'services.component.html'
})
export class ServiceComponent implements OnInit {
  categories = [];
  services = [];
  constructor(
    private dataService: DataService,
    private util: UtilService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.util.startLoader();
    this.getServices();
    this.getCategories();
  } 
  
  getCategories() {
    this.dataService.categories.subscribe((res) => {
      if(res) {
        this.categories = res;
      }
    });
  }

  getServices() {
    this.dataService.services.subscribe((res) => {
      this.util.stopLoader();
      if(res) {
        this.services = res;
      }
    });
  }

  removeService(service) {
    this.util.startLoader();
    this.firebaseService.removeDataFromCollection('services', service.serviceId).then(()  => {
      this.util.showSuccessToast('Success', 'Record has been deleted!');
      this.util.stopLoader();
    }, err => {
      this.util.showSuccessToast('Error', 'Something went wrong!');
      this.util.stopLoader();
      console.error('err: ', err);
    })
  }

}

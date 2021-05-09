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
    private utilService: UtilService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
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
      if(res) {
        this.services = res;
      }
    });
  }

  
}

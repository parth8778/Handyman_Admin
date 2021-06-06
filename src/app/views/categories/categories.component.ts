import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';

@Component({
  templateUrl: 'categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories = [];
  constructor(
    private dataService: DataService,
    private firebase: FirebaseService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  } 

  getCategories() {
    this.util.startLoader();
    this.dataService.categories.subscribe((res) => {
      if(res) {
        this.categories = res;
      }
      this.util.stopLoader();
    });
  }

  removeCategory(categoryId) {
    console.log('here here here')
    this.util.startLoader();
    this.firebase.removeDataFromCollection('categories', categoryId).then(() => {
      this.util.showSuccessToast('Success', 'Record has been deleted!');
      this.util.stopLoader();
    }, () => {
      this.util.showSuccessToast('Error', 'Something went wrong!');
      this.util.stopLoader();
    });
  }
}

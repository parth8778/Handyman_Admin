import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories = [];
  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  } 

  getCategories() {
    this.dataService.categories.subscribe((res) => {
      if(res) {
        this.categories = res;
      }
    });
  }
}

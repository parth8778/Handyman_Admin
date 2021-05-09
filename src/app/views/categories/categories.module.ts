import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CommonModule } from '@angular/common';
import { AddCategoriesComponent } from './add-category-model';
import { ModalModule } from 'ngx-bootstrap/modal';

const components = [
  AddCategoriesComponent
]

@NgModule({
  imports: [
    FormsModule,
    CategoriesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ], 
  declarations: [ 
    CategoriesComponent,
    ...components 
  ],
  exports: [
    ...components
  ],
})
export class CategoriesModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ServiceComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service-model';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditServiceComponent } from './edit-service-model';

const components = [
  AddServiceComponent,
  EditServiceComponent
];
@NgModule({
  imports: [
    FormsModule,
    ServicesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ], 
  declarations: [ 
    ServiceComponent,
    ...components 
  ],
  exports: [
    ...components
  ],
})
export class ServicesModule { }

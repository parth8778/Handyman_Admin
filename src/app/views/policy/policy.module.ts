import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { PolicyComponent } from './policy.component';
import { PolicyRoutingModule } from './policy-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    FormsModule,
    PolicyRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxEditorModule
  ], 
  declarations: [ 
    PolicyComponent
  ],
  exports: [
  ],
})
export class PolicyModule { }

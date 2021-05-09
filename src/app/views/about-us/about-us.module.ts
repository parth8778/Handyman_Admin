import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    FormsModule,
    AboutUsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxEditorModule
  ], 
  declarations: [ 
    AboutUsComponent
  ],
  exports: [
  ],
})
export class AboutUsModule { }

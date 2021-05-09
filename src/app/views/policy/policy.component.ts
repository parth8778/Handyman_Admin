import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';

@Component({
  templateUrl: 'policy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PolicyComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: any;
  htmlId: any;
  policyData: any;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(
    private firebaseService: FirebaseService,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.getPolicy();
    this.editor = new Editor();
  } 

  getPolicy() { 
    this.firebaseService.getCollectionWithId('policy').subscribe((res: any) => {
      if (res && res.length > 0) {
        this.html = res[0].data;
        this.htmlId = res[0].id;
      }
    });
  }

  updatePolicy() {
    // const html = toHTML(this.html); // schema is optional
    if (this.html) {
      this.firebaseService.addOrUpdateCollection(`policy/${this.htmlId}`, {
       data: this.html 
      }).then(() => {
         this.utilService.showSuccessToast('Success', 'Policy has been updated...');
      }, err => {
        console.log('err: ', err);
        this.utilService.showErrorToast('Success', 'Something went wrong!!');
      });
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}

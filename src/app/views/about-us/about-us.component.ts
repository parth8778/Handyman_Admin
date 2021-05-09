import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor, toHTML, Toolbar, toDoc } from 'ngx-editor';
import { FirebaseService } from '../../services/firebase.service';
import { UtilService } from '../../services/util.service';

@Component({
  templateUrl: 'about-us.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit, OnDestroy {
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
    this.getAboutUs();
    this.editor = new Editor();
  } 

  getAboutUs() { 
    this.firebaseService.getCollectionWithId('aboutUs').subscribe((res: any) => {
      if (res && res.length > 0) {
        this.html = res[0].data;
        this.htmlId = res[0].id;
      }
    });
  }

  updateAboutUs() {
    // const html = toHTML(this.html); // schema is optional
    if (this.html) {
      this.firebaseService.addOrUpdateCollection(`aboutUs/${this.htmlId ? this.htmlId : ''}`, {
       data: this.html 
      }).then(() => {
         this.utilService.showSuccessToast('Success', 'About Us has been updated...');
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

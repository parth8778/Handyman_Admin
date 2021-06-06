import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Editor, Toolbar } from "ngx-editor";
import { FirebaseService } from "../../services/firebase.service";
import { UtilService } from "../../services/util.service";
import messages from "../../messages/messages";
@Component({
  templateUrl: "about-us.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit, OnDestroy {
  editor: Editor;
  html: any;
  htmlId: any;
  policyData: any;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"],
  ];
  constructor(
    private firebaseService: FirebaseService,
    private utilService: UtilService
  ) {} 

  ngOnInit(): void {
    this.getAboutUs();
    this.editor = new Editor();
  }

  getAboutUs() {
    this.firebaseService
      .getCollectionWithDocId("settings", "aboutUs")
      .subscribe((res: any) => {
        if (res && res.data) {
          this.html = res.data;
        }
      });
  }

  updateAboutUs() {
    this.utilService.startLoader();
    if (this.html) {
      this.firebaseService
        .addOrUpdateCollection("settings", { data: this.html }, "aboutUs")
        .then(
          () => {
            this.utilService.showSuccessToast(
              messages.successTitle,
              messages.updateAboutUsSuccess
            );
            this.utilService.stopLoader();
          },
          (err) => {
            console.log("err: ", err);
            this.utilService.showErrorToast(
              messages.errorTitle,
              messages.somethingWentWrong
            );
            this.utilService.stopLoader();
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

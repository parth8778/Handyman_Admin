import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../../services/firebase.service";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { UtilService } from "../../../services/util.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import messages from "../../../messages/messages";

@Component({
  templateUrl: "edit-categories.component.html",
  selector: "edit-category",
})
export class EditCategoriesComponent implements OnInit {
  @ViewChild('categoryEditModal') public categoryEditModal: ModalDirective;
  @Input() category = null;
  public categoryForm: FormGroup;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  constructor(
    private builder: FormBuilder,
    private firebaseService: FirebaseService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.builder.group({
      categoryName: [this.category['categoryName'], [Validators.required]],
      categoryIcon: [this.category['categoryIcon'], [Validators.required]],
      categoryDescription: [this.category['categoryDescription'], [Validators.required]],
      enabled: [this.category['enabled'], [Validators.required]],
      categoryId: [this.category['categoryId'], Validators.required],
    });
  }

  editCategory() {
    this.utilService.startLoader();
    if (this.categoryForm.valid) {
      const docId = this.categoryForm.value.categoryId;
      this.firebaseService.addOrUpdateCollection('categories', this.categoryForm.value, docId).then(() => {
          this.utilService.stopLoader();
          this.utilService.showSuccessToast(messages.successTitle, messages.updateCategorySuccess);
          this.initForm();
          this.categoryEditModal.hide();
      }).catch((err) => {
        this.utilService.showErrorToast(messages.errorTitle, messages.somethingWentWrong);
        this.utilService.stopLoader();
        console.log('err: ', err);
      });
    }
  }

  onFileSelected(event) {
    try {
      this.utilService.startLoader();
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `bucket/${n}`;
      const fileRef = this.firebaseService.storage.ref(filePath);
      const task = this.firebaseService.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((url) => {
              if (url) {
                this.fb = url;
                this.categoryForm.patchValue({
                  categoryIcon: url
                });
                 console.log('this.categoryForm', this.categoryForm.value)
              }
              console.log(this.fb);
            });
          })
        )
        .subscribe(
          (url) => {
            if (url) {
              this.utilService.stopLoader();
            }
          },
          (err) => {
            console.log(`${err} while upload photo`);
            this.utilService.stopLoader();
          }
        );
    } catch (Error) {
      console.log("Error: ", Error);
      this.utilService.stopLoader();
    }
  }
}

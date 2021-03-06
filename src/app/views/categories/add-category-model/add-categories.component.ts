import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseService } from "../../../services/firebase.service";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { UtilService } from "../../../services/util.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import messages from "../../../messages/messages";
@Component({
  templateUrl: "add-categories.component.html",
  selector: "add-category",
})
export class AddCategoriesComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @Input() btnText = '';
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
      categoryName: ["", [Validators.required]],
      categoryIcon: ["", [Validators.required]],
      categoryDescription: ["", [Validators.required]],
      enabled: [true, [Validators.required]],
      categoryId: [this.firebaseService.fireStore.createId(), Validators.required],
    });
  }

  addCategory() {
    this.utilService.startLoader();
    if (this.categoryForm.valid) {
      const request = {
        ...this.categoryForm.value,
        docId: this.categoryForm.value.categoryId
      }
      this.firebaseService.addDataToCollection('categories', request).then(() => {
          this.utilService.showSuccessToast(messages.successTitle, messages.addCategorySuccess);
          this.initForm();
          this.utilService.stopLoader();
          this.myModal.hide();
      }).catch((err) => {
        this.utilService.showErrorToast(messages.errorTitle, messages.somethingWentWrong);
        this.utilService.stopLoader();
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

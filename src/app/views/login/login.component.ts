import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseService } from "../../services/firebase.service";
import { UtilService } from "../../services/util.service";
import messages from "../../messages/messages";
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent {
  email = "";
  password = "";
  constructor(
    private firebaseAuth: AngularFireAuth,
    private util: UtilService,
    private router: Router
  ) {}

  login() {
    this.util.startLoader();
    this.firebaseAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((value) => {
        this.util.stopLoader();
        if (value && value.user) {
          const { uid } = value.user;
          localStorage.setItem("authenticatedId", uid);
          this.router.navigateByUrl("/categories");
          this.util.showSuccessToast(
            messages.successTitle,
            messages.loginInSuccess
          );
        }
      })
      .catch((err) => {
        this.util.showErrorToast(messages.errorTitle, err.message);
        this.util.stopLoader();
      });
  }
}

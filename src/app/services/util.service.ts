import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    public ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  startLoader() {
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);
  }

  stopLoader() {
    this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
  }
  
  showSuccessToast(title, text) {
    this.toastr.success(title, text);
  }

  showErrorToast(title, text) {
    this.toastr.error(title, text);
  }
}

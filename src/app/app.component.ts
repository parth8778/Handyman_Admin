import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { FirebaseService } from './services/firebase.service';
import { DataService } from './services/data.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
  <ngx-ui-loader></ngx-ui-loader>
  <router-outlet></router-outlet>
  `,
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private firebaseService: FirebaseService,
    private dataService: DataService,
    private firebaseAuth: AngularFireAuth
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.firebaseAuth.authState.subscribe((res) => {
      if (res) {
        this.router.url
        if (this.router.url === '/login') {
          this.router.navigateByUrl('/dashboard')
        }
        this.setCategories();
        this.setServices();
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  setCategories() {
    this.firebaseService.getDataFromCollection('categories').subscribe((res) => {
      console.log('categories res: ', res);
      if (res) {
        this.dataService.categories.next(res);
      }
    }, err => {
      console.log('err: ', err);
    });
  }

  setServices() {
    this.firebaseService.getDataFromCollection('services').subscribe((res) => {
      console.log('services res: ', res);
      if (res) {
        this.dataService.services.next(res);
      }
    }, err => {
      console.log('err: ', err);
    });
  }
}

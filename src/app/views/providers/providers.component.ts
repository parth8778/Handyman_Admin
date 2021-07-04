import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from '../../services/util.service';

@Component({
  templateUrl: 'providers.component.html'
})
export class ProvidersComponent implements OnInit {
  providers = [];
  constructor(
    private fireStore: AngularFirestore,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.util.startLoader();
    this.fireStore
    .collection('users', (ref) => ref
      .where('role', '==', 'PROVIDER')
    )
    .valueChanges()
    .subscribe((resp) => {
      if (resp) {
        resp.forEach((element: any) => {
         const sub = this.fireStore.collection('categories').doc(element.selectedCategory).valueChanges().subscribe((categoryResp) => {
            element.categoryDetails = categoryResp;
            sub.unsubscribe();
          })
        });
        this.providers = resp;
      }
      this.util.stopLoader();
    })
  } 

}

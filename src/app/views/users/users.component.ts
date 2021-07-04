import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from '../../services/util.service';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users = []
  constructor(
    private fireStore: AngularFirestore,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.util.startLoader();
    this.fireStore
    .collection('users', (ref) => ref
      .where('role', '==', 'USER')
    )
    .valueChanges()
    .subscribe((resp) => {
      if (resp) {
        this.users = resp;
        console.log('this.users: ', this.users);
      }
      this.util.stopLoader();
    })
  } 
}

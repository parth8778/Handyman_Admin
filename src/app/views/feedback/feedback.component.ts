import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from '../../services/util.service';
@Component({
  templateUrl: 'feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  feedback = [];
  constructor(
    private fireStore: AngularFirestore,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.util.startLoader();
    this.fireStore
    .collection('feedback')
    .valueChanges()
    .subscribe((resp) => {
      if (resp) {
        resp.forEach((element: any) => {
          this.fireStore.collection('users').doc(element.uid).valueChanges().subscribe((userResp) => {
            element.userDetails = userResp;
          });
        });
        this.feedback = resp;
        console.log('this.feedback: ', this.feedback);
      }
      this.util.stopLoader();
    })
  } 
}

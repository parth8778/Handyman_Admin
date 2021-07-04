import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from '../../services/util.service';
@Component({
  templateUrl: 'requests.component.html'
})
export class RequestsComponent implements OnInit {
  requests = []
  constructor(
    private fireStore: AngularFirestore,
    private util: UtilService
  ) {}
 
  ngOnInit(): void {
    this.util.startLoader();
    this.fireStore
    .collection('request')
    .valueChanges()
    .subscribe((resp) => {
      if (resp) {
        resp.forEach((element: any) => {
          this.fireStore.collection('users').doc(element.providerId).valueChanges().subscribe((providerResp) => {
            element.providerDetails = providerResp;
          });
          this.fireStore.collection('users').doc(element.uId).valueChanges().subscribe((userResp) => {
            element.userDetails = userResp;
          });
        });
        this.requests = resp;
        console.log('this.users: ', this.requests);
      }
      this.util.stopLoader();
    })
  } 

  getBookingStatusNameByBookingStatusId(jobStatus) {
    let jobStatusInText = '';
    switch (jobStatus) {
      case 0:
        jobStatusInText = 'pending';
        break;

      case 1:
      case 2:
        jobStatusInText = 'inprogress';
        break;

      case 3:
        jobStatusInText = 'completed';
        break;

      case 4:
        jobStatusInText = 'rejected';
        break;

      default:
        jobStatusInText = 'pending';
        break;
    }

    return jobStatusInText;
  }
}

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { CustomerDTO } from 'src/models/customer.dto';
import { CustomerService } from 'src/services/domain/customer.service';
import { API_CONFIG } from 'src/config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  customer: CustomerDTO;

  constructor(public storage: StorageService, public customerService: CustomerService, public navCtrl: NavController, ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.customer = response as CustomerDTO;
          this.getImageIfExists();
        }, error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot("/home");
          }
        });
    } else {
      this.navCtrl.navigateRoot("/home");
    }
  }

  getImageIfExists() {
    this.customerService.getImageFromBucket(this.customer.id)
      .subscribe(response => {
        this.customer.imageUrl = `${API_CONFIG.buckectBaseUrl}/cp${this.customer.id}.jpg`;
      }, error => { });
  }

}

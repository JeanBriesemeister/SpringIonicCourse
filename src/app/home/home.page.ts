import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredentialsDTO } from 'src/models/credential.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  credentials: CredentialsDTO = {
    email: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) { }

  public login() {
    this.auth.authenticate(this.credentials)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
      }, error => { });
    this.navCtrl.navigateForward('/categories');
  }

  public products() {
    this.navCtrl.navigateForward('/products');
  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

}

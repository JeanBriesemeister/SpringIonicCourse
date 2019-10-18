import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  public login() {
    this.navCtrl.navigateForward('/categories');
  }

  public products() {
    this.navCtrl.navigateForward('/products');
  }

}

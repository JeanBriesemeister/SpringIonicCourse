import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public auth: AuthService, public navCtrl: NavController) { }

  ngOnInit() {
    this.logOut();
  }

  logOut() {
    this.auth.logOut();
  }

  backToLogin() {
    this.navCtrl.navigateRoot('/home');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from 'src/services/domain/city.service';
import { ProvinceService } from 'src/services/domain/province.service';
import { ProvinceDTO } from 'src/models/province.dto';
import { CityDTO } from 'src/models/city.dto';
import { CustomerService } from 'src/services/domain/customer.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public formGroup: FormGroup;

  public provinces: ProvinceDTO[];

  public cities: CityDTO[];

  constructor(
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public provinceService: ProvinceService,
    public customerService: CustomerService,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      customerType: ['1', [Validators.required]],
      financialCode: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      street: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      district: ['Copacabana', []],
      postalCode: ['10828333', [Validators.required]],
      telephone1: ['977261827', [Validators.required]],
      telephone2: ['', []],
      telephone3: ['', []],
      provinceId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces() {
    this.provinceService.findAll()
      .subscribe(response => {
        this.provinces = response;
        this.formGroup.controls.provinceId.setValue(this.provinces[0].id);
        this.updateCities();
      }, error => { });
  }

  updateCities() {
    let provinceId = this.formGroup.value.provinceId;
    this.cityService.findAll(provinceId)
      .subscribe(response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      }, error => { });
  }

  signupUser() {
    console.log(this.formGroup.value);

    this.customerService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      }, error => { });
  }

  async showInsertOk() {
    let alert = await this.alertController.create({
      header: 'Success!',
      message: 'Customer inserted with success',
      backdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });

    await alert.present();
  }

}

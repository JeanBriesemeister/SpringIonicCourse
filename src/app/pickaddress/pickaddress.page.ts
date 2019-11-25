import { Component, OnInit } from '@angular/core';
import { AddressDTO } from 'src/models/address.dto';

@Component({
  selector: 'app-pickaddress',
  templateUrl: './pickaddress.page.html',
  styleUrls: ['./pickaddress.page.scss'],
})
export class PickaddressPage implements OnInit {

  items: AddressDTO[];

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadAddresses();
  }

  loadAddresses() {
    this.items = [
      {
        id: "1",
        street: "Rua Quinze de Novembro",
        number: "300",
        complement: "Apto 200",
        district: "Santa Mônica",
        postalCode: "48293822",
        city: {
          id: "1",
          name: "Uberlândia",
          province: {
            id: "1",
            name: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        street: "Rua Alexandre Toledo da Silva",
        number: "405",
        complement: null,
        district: "Centro",
        postalCode: "88933822",
        city: {
          id: "3",
          name: "São Paulo",
          province: {
            id: "2",
            name: "São Paulo"
          }
        }
      }
    ];
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      customerType: ['1', [Validators.required]],
      financialcode: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      street: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      district: ['Copacabana', []],
      postalcode: ['10828333', [Validators.required]],
      telephone1: ['977261827', [Validators.required]],
      telephone2: ['', []],
      telephone3: ['', []],
      provinceId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  signupUser() {
    console.log("enviou o form");
  }

}

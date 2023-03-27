import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrls: ['./register-process.component.scss'],
})
export class RegisterProcessComponent implements OnInit {
  form: FormGroup;
  clear: boolean = false;
  clearConfirm: boolean = false;
  sending = false;
  fecha = new Date();
  passwordTyping = false;
  usuarioTyping = false;

  constructor() {
    this.form = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  register() {}
}

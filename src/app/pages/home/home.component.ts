import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
  }

  viewListProducts(): void {
    if(this._auth.isAuth()) {
      this._router.navigate(['/list-products']);
      return;
    }
    this._router.navigate(['/login']);
  }

}

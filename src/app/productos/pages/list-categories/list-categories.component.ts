import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  constructor(private readonly _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
  }

  viewListProducts(): void {
    if(this._auth.isAuth()) {
      this._router.navigate(['/home/list-categories']);
      return;
    }
    this._router.navigate(['/login']);
  }

}

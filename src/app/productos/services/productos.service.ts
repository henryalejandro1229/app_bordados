import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private readonly http: HttpClient) { }

  getCategoryPerSex(category: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getCategoriesPerSex.php?categorySex=${category}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.url}/products/getCategories.php`);
  }

  getProductsPerCategory(category: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getProductsPerCategory.php?id=${category}`);
  }

  getrCategory(id: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getCategory.php?id=${id}`);
  }
}

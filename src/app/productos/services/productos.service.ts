import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoryModelo } from '../models/productos.modelo';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private readonly http: HttpClient) {}

  getCategoryPerSex(category: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getCategoriesPerSex.php?categorySex=${category}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.url}/products/getCategories.php`);
  }

  createCategory(formData: CategoryModelo): Observable<any> {
    let params = new HttpParams()
      .append('name', formData.name)
      .append('description', formData.description)
      .append('categorySex', formData.categorySex);
    return this.http.get(`${environment.url}/products/createCategory.php`, {
      params,
    });
  }

  updateCategory(id: string, formData: CategoryModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('description', formData.description)
      .append('categorySex', formData.categorySex);
    return this.http.get(`${environment.url}/products/updateCategory.php`, {
      params,
    });
  }

  getProductsPerCategory(category: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getProductsPerCategory.php?id=${category}`
    );
  }

  getrCategory(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getCategory.php?id=${id}`
    );
  }
}

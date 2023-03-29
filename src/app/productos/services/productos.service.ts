import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoryModelo, ProductoModelo } from '../models/productos.modelo';

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

  getProducts(): Observable<any> {
    return this.http.get(`${environment.url}/products/getProducts.php`);
  }

  createProduct(formData: ProductoModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
    .append('title', formData.title)
    .append('description', formData.description)
    .append('categorySex', formData.categorySex)
    .append('precio', formData.precio)
    .append('imageUrl', imageUrl)
    .append('marca', formData.marca);
    return this.http.get(`${environment.url}/products/createProduct.php`, {
      params,
    });
  }

  updateProduct(id: string, formData: ProductoModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('title', formData.title)
      .append('description', formData.description)
      .append('categorySex', formData.categorySex)
      .append('precio', formData.precio)
      .append('marca', formData.marca);
    return this.http.get(`${environment.url}/products/updateProduct.php`, {
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

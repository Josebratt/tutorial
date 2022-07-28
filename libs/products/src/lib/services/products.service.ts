
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  // get data
  getCategories(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  // get data for update
  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  // }

  //create data
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  // update data
  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
  // }

  // delete data
  // deleteCategory(categoryId: string): Observable<Category> {
  //   return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
  // }
}

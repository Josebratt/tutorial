
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  // get data
  getProducts(categoryFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryFilter) {
      params = params.append('categories', categoryFilter.join(','));      
    }
    return this.http.get<Product[]>(this.apiURLProducts, {params: params});
  }

  // get Id for update
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  //create data
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  // update data
  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData);
  }

  //delete data
  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`);
  }

  //
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  //
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Order } from '@tutorial/orders';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
 export class OrdersService {

  apiURLOrders = environment.apiURL + 'orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`);
  }
    
}
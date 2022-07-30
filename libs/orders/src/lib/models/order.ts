import { OrderItem } from './order-item';
import { User } from '@tutorial/users';

export class Order {
  id = '';
  orderItems: OrderItem[] = [];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user: User = new User;
  dateOrdered?: string;
}
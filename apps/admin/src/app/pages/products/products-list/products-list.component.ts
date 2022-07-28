import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@tutorial/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getCategories().subscribe(
      data => this.products = data
    )

  }

  updateProduct(productId: string) {

  }

  deleteProduct(productId: string) {

  }

}

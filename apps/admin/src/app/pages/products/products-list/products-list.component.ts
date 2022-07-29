import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@tutorial/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  totalProducts = 0;
  

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getCategories().subscribe(
      data =>{ 
        this.products = data;
        this.totalProducts = data.length;
      }
    )

  }

  updateProduct(productId: string) {

      this.router.navigateByUrl(`products/form/${productId}`);


  }

  deleteProduct(productId: string) {

  }

}

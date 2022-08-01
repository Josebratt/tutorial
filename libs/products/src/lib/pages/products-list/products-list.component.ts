import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'tutorial-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage= false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoryFilter?: string[]) {
    this.productsService.getProducts(categoryFilter).subscribe(
      response => this.products = response
    )
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories: any = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    console.log(selectedCategories);
    
    this._getProducts(selectedCategories);
  }

}

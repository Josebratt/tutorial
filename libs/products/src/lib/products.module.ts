import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent
  ],
})
export class ProductsModule {}

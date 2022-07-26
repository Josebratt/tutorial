import { CategoriesService, Category } from '@tutorial/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      cats => this.categories = cats
    )
  }

}

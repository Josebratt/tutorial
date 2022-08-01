import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';

@Component({
  selector: 'tutorial-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubs$: Subject<unknown> = new Subject();

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(
      (response) => {       
        this.categories = response
      }

    )
  }

  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

}

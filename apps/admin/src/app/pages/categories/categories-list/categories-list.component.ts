import { CategoriesService, Category } from '@tutorial/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endsubs$: Subject<unknown> = new Subject();


  constructor(
    private categoriesService:CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }


  ngOnInit(): void {
    this._getCategory();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getCategory(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(
      cats => this.categories = cats
    )
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string){
    console.log('borrar este id '+ categoryId);
    
    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(
          (response) => {
              this._getCategory();
              this.messageService.add({severity:'success', summary: 'Success Message', detail:'Category is deleted'});
          }, (error) => {
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Category is not deleted'});       
          }
        );
      }
  });

    
    
  }
}

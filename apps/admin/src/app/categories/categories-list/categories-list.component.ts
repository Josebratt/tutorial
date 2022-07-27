import { CategoriesService, Category } from '@tutorial/products';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoriesService:CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    this._getCategory();
  }

  _getCategory(){
    this.categoriesService.getCategories().subscribe(
      cats => this.categories = cats
    )
  }

  deleteCategory(categoryId: string){
    console.log('borrar este id '+ categoryId);
    
    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
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

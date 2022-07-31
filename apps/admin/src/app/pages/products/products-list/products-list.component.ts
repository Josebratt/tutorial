import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@tutorial/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  totalProducts = 0;

  endsubs$: Subject<unknown> = new Subject();
  
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getProducts(){
    this.productsService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(
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
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      }
    });
  }

}

import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@tutorial/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;
  currentProductId = '';
  categories: Category[] = [];
  imageDisplay? = '';
  imageSelected = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.form.invalid) {
      console.log('invalid');
      return;
    }

    const productFormData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productFormData.append(key, this.form.controls[key].value);
      console.log(this.form.controls[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }

    
  }

  cancel() {
    this.location.back();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  imageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `Product ${product.name} is created`,
        });
        timer(2000).subscribe((t) => this.location.back());
      },
      (error: { message: any }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `Product ${error.message} is not created`,
        });
      }
    );
  }

  //
  private _updateProduct(productFormData: FormData, ) {
    this.productsService.updateProduct(productFormData, this.currentProductId ).subscribe(
      (category: Category) => {
        this.messageService.add({severity:'success', summary: 'Success Message', detail: `Category ${category.name} is updated`});
        timer(2000).subscribe(
          t => this.location.back()
        )
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: `Category ${error.message} is not updated`});
    });
  }
  // get the id to update
  private _checkEditMode() {
    let id = '';
    this.route.params.subscribe(
      params => {
        id = params['id']
        if (id) {
          this.editmode = true;
          this.currentProductId = id;
          this.productsService.getProduct(id).subscribe(
            product => {
              this.form.get('name')?.setValue(product.name);
              this.form.get('brand')?.setValue(product.brand);
              this.form.get('price')?.setValue(product.price);
              this.form.get('category')?.setValue(product.category?.id);
              this.form.get('countInStock')?.setValue(product.countInStock);
              this.form.get('description')?.setValue(product.description);
              this.form.get('richDescription')?.setValue(product.richDescription);
              this.form.get('isFeatured')?.setValue(product.isFeatured);
              this.imageDisplay = product.image;
              this.form.get('image')?.setValidators([]);
              this.form.get('image')?.updateValueAndValidity();

            }
          )
        }
      }
    )
  }



}

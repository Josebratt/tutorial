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
  currentCategoryId = '';
  categories: Category[] = [];
  imageDisplay!: string | ArrayBuffer | null;
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
      image: [''],
      isFeatured: [false],
    });
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.form.invalid) {
      console.log('invalid');
      return;
    }

    const product: Product = {
      name: this.form.get('name')?.value,
      brand: this.form.get('brand')?.value,
      price: this.form.get('price')?.value,
      countInStock: this.form.get('countInStock')?.value,
      category: this.form.get('category')?.value,
      isFeatured: this.form.get('isFeatured')?.value,
      description: this.form.get('description')?.value,
      richDescription: this.form.get('richDescription')?.value,
      image: '',
    };

    const productFormData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productFormData.append(key, this.form.controls[key].value);
      console.log(this.form.controls[key].value);
    });

    this._addProduct(productFormData);
  }

  cancel() {}

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

  // get productForm() {
  //   return this.form.controls;
  // }
}

import { Category } from '@tutorial/products';
import { CategoriesService } from '@tutorial/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmited = false;
  editmode = false;
  currentCategoryId = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.form.get('name')?.value,
      icon: this.form.get('icon')?.value,
      color: this.form.get('color')?.value,
    }

    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

    
  }

  // create Category
  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({severity:'success', summary: 'Success Message', detail:`Category ${category.name} is created`});
        timer(2000).subscribe(
          t => this.location.back()
        )
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: `Category ${error.message} is not created`});
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
          this.currentCategoryId = id;
          this.categoriesService.getCategory(id).subscribe(
            category => {
              this.form.get('name')?.setValue(category.name);
              this.form.get('icon')?.setValue(category.icon);
              this.form.get('color')?.setValue(category.color);
            }
          )
        }
      }
    )
  }

  //
  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({severity:'success', summary: 'Success Message', detail: `Category ${category.name} is updated`});
        timer(2000).subscribe(
          t => this.location.back()
        )
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error Message', detail: `Category ${error.message} is not updated`});
    });
  }

  cancel() {
    this.location.back();
  }

}

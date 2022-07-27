import { Category } from '@tutorial/products';
import { CategoriesService } from '@tutorial/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isSubmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.form.get('name')?.value,
      icon: this.form.get('icon')?.value,
    }
    try {
      this.categoriesService.createCategory(category).subscribe(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Success Message', detail:'Category is created'});
          timer(2000).subscribe(
            t => this.location.back()
          )
        })
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'Category is not created'});
    }
  }

}

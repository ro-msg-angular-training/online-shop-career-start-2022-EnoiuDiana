import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    category: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    image: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")])
  })

  //form state
  loading = false;
  success = false;

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.addProductForm.valueChanges.subscribe(console.log)
  }


  async submitHandler() {
    this.loading = true;
    const formValue = this.addProductForm.value;

    let data = {
      "name": formValue.name,
      "category": formValue.category,
      "image": formValue.image,
      "price": formValue.price,
      "description": formValue.description
    }

    console.log(data)

    await this.productsService.addProduct(data).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

    this.goBack();

    this.loading = false;
    this.success = true;

  }

  goBack(): void {
    this.location.back();
  }

  get price() {
    return this.addProductForm.get('price')
  }

  get name() {
    return this.addProductForm.get('name')
  }

  get image() {
    return this.addProductForm.get('image')
  }

  get category() {
    return this.addProductForm.get('category')
  }

  get description() {
    return this.addProductForm.get('description')
  }


}

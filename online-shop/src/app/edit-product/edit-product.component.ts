import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ProductsService} from "../products.service";
import {tap, first} from "rxjs/operators";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: any;

  editProductForm: FormGroup = new FormGroup({
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
    this.getProduct()

    this.editProductForm.valueChanges.subscribe(console.log)

  }

  getProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(id)
      .subscribe(product => {
        this.product = product
        this.initializeForm()
      });
  }

  initializeForm() {
    this.editProductForm.setValue({
      name: [this.product.name],
      category: [this.product.category],
      image: [this.product.image],
      price: [this.product.price],
      description: [this.product.description]
    })
  }

  async submitHandler() {
    this.loading = true;
    const formValue = this.editProductForm.value;

    let data = {
      "id": this.product.id,
      "name": formValue.name,
      "category": formValue.category,
      "image": formValue.image,
      "price": formValue.price,
      "description": formValue.description
    }

    console.log(data)

    await this.productsService.updateProducts(this.product.id, data).subscribe(val => {
        console.log("PUT call successful value returned in body",
          val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      });

    this.goBack();

  }

  goBack(): void {
    this.location.back();
  }

  get price() {
    return this.editProductForm.get('price')
  }

  get name() {
    return this.editProductForm.get('name')
  }

  get image() {
    return this.editProductForm.get('image')
  }

  get category() {
    return this.editProductForm.get('category')
  }

  get description() {
    return this.editProductForm.get('description')
  }

}

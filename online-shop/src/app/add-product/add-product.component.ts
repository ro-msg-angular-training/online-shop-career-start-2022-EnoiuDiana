import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {addProduct} from "../state/actions/product.actions";
import {ProductAdd} from "../interfaces/ProductAdd";

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

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }


  submitHandler() {
    const formValue = this.addProductForm.value;

    const data: ProductAdd = {
      "name": formValue.name,
      "category": formValue.category,
      "image": formValue.image,
      "price": formValue.price,
      "description": formValue.description
    }

    this.store.dispatch(addProduct({product: data}))

    this.goBack();

  }

  goBack(): void {
    this.router.navigate(["show_products"]).then();
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

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }


  submitHandler() {
    const formValue = this.addProductForm.value;

    const data = {
      "name": formValue.name,
      "category": formValue.category,
      "image": formValue.image,
      "price": formValue.price,
      "description": formValue.description
    }

    this.productsService.addProduct(data).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        })

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

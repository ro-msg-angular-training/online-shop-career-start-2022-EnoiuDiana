import {Component, OnDestroy, OnInit} from '@angular/core';
import {audit, Observable, of} from "rxjs";
import {ProductsService} from "../products.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  id: any;
  userIsAdmin = false;
  userIsCustomer = false;

  quantityForm: FormGroup = new FormGroup({
    quantity: new FormControl(''),
  })

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private location: Location,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getUserRoles()
  }

  getProduct(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(this.id)
      .subscribe(product => this.product = product);
  }

  getUserRoles() {
    this.userIsAdmin = this.auth.verifyAdmin()
    this.userIsCustomer = this.auth.verifyCustomer()
  }

  goBack(): void {
    this.location.back();
  }

  deleteProduct(id: number) {
    this.productsService.deleteProductById(id).subscribe(
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
    this.location.back();
  }

  async addToCartButtonPressed() {
    const formValue = this.quantityForm.value;
    this.productsService.addProductToCart(this.product, formValue.quantity)
    this.goBack()
  }
}

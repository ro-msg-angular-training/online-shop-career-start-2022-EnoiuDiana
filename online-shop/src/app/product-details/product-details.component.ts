import {Component, OnDestroy, OnInit} from '@angular/core';
import {audit, Observable, of, Subscription} from "rxjs";
import {ProductsService} from "../products.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Product} from "../Product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product | undefined;
  id: number | undefined;
  userIsAdmin = false;
  userIsCustomer = false;

  productSubs: Subscription | undefined

  quantityForm: FormGroup = new FormGroup({
    quantity: new FormControl(''),
  })

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getUserRoles()
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe()
  }

  getProduct(): void {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.productSubs = this.productsService.getProductById(this.id)
      .subscribe(product => this.product = product);
  }

  getUserRoles() {
    this.userIsAdmin = this.auth.verifyAdmin()
    this.userIsCustomer = this.auth.verifyCustomer()
  }

  goBack(): void {
    this.router.navigate(["show_products"]).then();
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
    this.goBack()
  }

  addToCartButtonPressed() {
    const formValue = this.quantityForm.value;
    this.productsService.addProductToCart(this.product, formValue.quantity)
    this.goBack()
  }
}

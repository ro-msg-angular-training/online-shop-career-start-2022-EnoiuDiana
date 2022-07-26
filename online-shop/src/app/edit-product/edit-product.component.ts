import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ProductsService} from "../services/products.service";
import {Product} from "../interfaces/Product";
import {Subject, Subscription} from "rxjs";
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {editProduct, getProduct} from "../state/actions/product.actions";
import {selectOneProduct} from "../state/selectors/product.selectors";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {

  product: Product | undefined;

  editProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    category: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    image: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl('', [Validators.required, Validators.pattern("(.|\\s)*\\S(.|\\s)*")])
  })

  productSubs: Subscription | undefined

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  public productDetails$ = this.store.select(selectOneProduct)

  ngOnInit(): void {
    this.getProduct()
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe()
  }

  getProduct() {
    const id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(getProduct({id: id}))
    this.productSubs = this.productDetails$.subscribe((product) => {
      this.product = product
      this.initializeForm()
    })
  }

  initializeForm() {
    this.editProductForm.setValue({
      name: [this.product?.name],
      category: [this.product?.category],
      image: [this.product?.image],
      price: [this.product?.price],
      description: [this.product?.description]
    })
  }

  submitHandler() {
    const formValue = this.editProductForm.value;

    if(this.product) {
      const data: Product = {
        "id": this.product.id,
        "name": formValue.name,
        "category": formValue.category,
        "image": formValue.image,
        "price": formValue.price,
        "description": formValue.description
      }

      this.store.dispatch(editProduct({id: this.product.id, product: data}))

      this.goBack();
    }

  }

  goBack(): void {
    this.router.navigate(["show_products/" + this.product?.id]).then();
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

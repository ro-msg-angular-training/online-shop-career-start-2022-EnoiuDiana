import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductComponent} from "./product/product.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./login/login.component";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";

const routes: Routes = [
  {path: '',component: HomeComponent,pathMatch: 'full'},
  {path: "login", component: LoginComponent, pathMatch: 'full'},
  {path: 'show_products',
    canActivate:[AuthGuard],
    component: ProductComponent},
  {path: 'show_products/:id',
    canActivate:[AuthGuard],
    component: ProductDetailsComponent},
  {path: 'shopping_cart',
    canActivate:[AuthGuard],
    data: { roles: ['customer'] },
    component: ShoppingCartComponent},
  {path: 'edit_product/:id',
    canActivate:[AuthGuard],
    data: { roles: ['admin'] },
    component: EditProductComponent},
  {path: 'add_product',
    canActivate:[AuthGuard],
    data: { roles: ['admin'] },
    component:AddProductComponent},
  { path : '**' , redirectTo : '' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

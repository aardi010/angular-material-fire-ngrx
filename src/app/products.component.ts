import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy {
  productName: string;
  isDisabled = true;
  products = [];
  productSubscription = new Subscription();

  constructor(private productService: ProductsService) {
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productSubscription = this.productService.productUpdated.subscribe(() => {
      this.products = this.productService.getProducts();
    });
  }

  public onAddProduct(form) {
    // this.products.push(this.productName);
    if (form.valid) {
      // this.products.push(form.value.productName);
      this.productService.addProduct(form.value.productName);
    }
  }

  public onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}

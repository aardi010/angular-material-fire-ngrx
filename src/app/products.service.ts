import { Subject } from 'rxjs';

export class ProductsService {

  private products = ['A Book'];
  productUpdated = new Subject();

  addProduct(productName: string) {
    this.products.push(productName);
    this.productUpdated.next();
  }

  getProducts() {
    return [...this.products];
  }

  deleteProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
    this.productUpdated.next();
  }
}

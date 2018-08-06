import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Product} from '../01-shared/product.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductListService {

  productChanged = new Subject<Product[]>();
  startEditing = new Subject<number>();
  products: Product[]=[];

  constructor() { }

  getItems(){
    return this.products.slice();
    // return this._http.get(
    //     "http://localhost:4160/api/getItems"
    //   ).map(result =>result).catch(this.errorHandler);
}

getItem(index:number){
    return this.products[index];
}

addItem(product:Product){
    this.products.push(product);
    this.productChanged.next(this.products.slice());
}

addItemss(product: Product[]){
    this.products.push(...product);
    this.productChanged.next(this.products.slice());
}

updateItems(index: number, newProduct: Product){
    this.products[index] = newProduct;
    this.productChanged.next(this.products.slice());
}

deleteItem(index:number){
    this.products.splice(index,1);
    this.productChanged.next(this.products.slice());
}

errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server error");
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Product} from '../01-shared/product.model';
import {ProductListService} from '../02-service/product-list.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit, OnDestroy {

  products: Product[];
  columns: string[] =["Name", "Quantity", "Category", "Price", "Tax Rate", "Total"];
  selectedRow : number;
  grandTotal: number;

  private subscription :  Subscription;

  constructor(private plService : ProductListService) { }

  ngOnInit() {
    this.products = this.plService.getItems();
   
    this.subscription=this.plService.productChanged.subscribe(
      (products:Product[])=>{
        this.products =products;
        this.grandTotal =0;
        for(let item of products){
          this.grandTotal += item.total;
        }
      }
    );
    
  }

  onEditItem(index:number){
    this.plService.startEditing.next(index);
    this.selectedRow = index;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Product} from '../../01-shared/product.model';
import {ProductCategory} from '../../01-shared/product-category.enum';
import {ProductListService} from '../../02-service/product-list.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-receipt-edit',
  templateUrl: './receipt-edit.component.html',
  styleUrls: ['./receipt-edit.component.scss']
})
export class ReceiptEditComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Product;
  @ViewChild("f") plForm: NgForm;

  options : string[];

  constructor(private plService: ProductListService ) { }

  ngOnInit() {
    var options = Object.keys(ProductCategory);
    this.options = options.slice(options.length/2);

    this.subscription = this.plService.startEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem = this.plService.getItem(index);
        this.plForm.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity,
          category: this.editedItem.category,
          price: this.editedItem.price,
          taxRate: this.editedItem.taxRate
        });
      }
    );
  }

  onSubmit(form: NgForm){    
    const value = form.value;
    var totalValue = value.price * value.quantity;
    var total = totalValue + (value.taxRate* totalValue)/100;
    const newItem = new Product(value.name, value.quantity, value.category,value.price, value.taxRate, total);

    if(this.editMode){
      this.plService.updateItems(this.editedItemIndex,newItem);
    }
    else{
    this.plService.addItem(newItem);
    }
    this.editMode =false;
    form.reset();
  }

  onSelectedCategory(val: string){
    if(ProductCategory[val] === ProductCategory.Medical)
      {
        this.plForm.controls['taxRate'].setValue(20);
      }
      else{
        this.plForm.controls['taxRate'].setValue(0);
      }
  }

  onClear(){
    this.plForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.plService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

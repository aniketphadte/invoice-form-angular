import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptEditComponent } from './receipt/receipt-edit/receipt-edit.component';
import {ProductListService} from './02-service/product-list.service'


@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

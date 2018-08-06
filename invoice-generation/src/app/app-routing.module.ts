import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent} from './receipt/receipt.component'

const routes: Routes = [
    {
        path:'',
        redirectTo:'/generateReceipt',
        pathMatch: 'full'
    },
    {
        path:'generateReceipt',
        component:ReceiptComponent,
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
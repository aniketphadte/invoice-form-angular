import {ProductCategory} from './product-category.enum'
export class Product{
    constructor(public name: string
               , public quantity: number
               , public category: ProductCategory
               , public price: number
               , public taxRate: number
               , public total:number )
               {}
}
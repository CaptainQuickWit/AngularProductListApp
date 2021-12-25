import { Component, OnDestroy, OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
    //selector: 'pm-products', **will no longer be used as a directive**
    styleUrls: ['./product-list.component.css'],
    templateUrl:'./product-list.component.html',
    providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product Management';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage = '';
    filteredProducts: IProduct[] = [];
    sub!: Subscription;
    products: IProduct[] = [];

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }

     /* old way of doing it
    private _productService;
    constructor(productService: ProductService) {
        this._productService = productService;
    }*/

    constructor(private productService: ProductService) {

    }
    
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage=!this.showImage;
    }

    onRatingClicked(message: string):void {
        this.pageTitle = 'Product List: ' + message;
    }

    ngOnInit(): void {
        this.listFilter = 'cart';
        console.log('In OnInit');
        //this.products = this.productService.getProducts(); 1st
        /*
        this.productService.getProducts().subscribe({ 2nd
            next: products => this.products = products,
            error: err => this.errorMessage = err
        });
        this.filteredProducts = this.products;*/

        //3rd
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
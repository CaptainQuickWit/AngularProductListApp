import { Component } from '@angular/core';

@Component({
    selector: 'pm-products',
    styleUrls: ['./product-list.component.css'],
    templateUrl:'./product-list.component.html'
})
export class ProductListComponent {
    pageTitle: string = 'Product List';
}
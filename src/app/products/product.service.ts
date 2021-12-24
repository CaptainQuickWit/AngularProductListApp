import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
    
})
export class ProductService {

    
    /**
     * !!!!NOTE!!!!!
     *  
     * Because there is no backend for this app the api will be used in place of a url. If 
     * you are interested in seeing a full stack (MEAN) angular project go to 
     * https://github.com/CaptainQuickWit/AppointmentsApp-Angular 
     */
    private productUrl = 'api/products/products.json';

    //initialize httpclient as http 
    constructor (private http: HttpClient) {

    }

    //Create an observable to retreive data from our "server"
    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            // backend returned an unsuccessful reponse code.
            //the response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

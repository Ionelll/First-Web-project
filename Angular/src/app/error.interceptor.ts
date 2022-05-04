import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler } from '@angular/common/http';

import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertComponent } from './alert/alert.component';

@Injectable ({providedIn: 'root'})

export class ErrorInterceptor implements HttpInterceptor{

    constructor(private snacbar: AlertComponent){}
    intercept(req: HttpRequest<any>, next: HttpHandler): any{
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.snacbar.openSnackBar({message: error.error, action: 'Close', className: 'redalert'});
                return throwError(error);
            }));
    }
}

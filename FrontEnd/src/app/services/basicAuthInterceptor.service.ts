import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountServiceService } from './account-service.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private account: AccountServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isLoggedIn = this.account.isLoggedIn;
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { 
                    Authorization: '' + sessionStorage.getItem("token")
                }
            });
        }
        return next.handle(request);
    }
}
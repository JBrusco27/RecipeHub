import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const accessToken = localStorage.getItem('jwtAccess');

    const authReq = accessToken ? request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
    }) : request;

    return next(authReq);
};
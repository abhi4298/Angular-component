import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { UsersService } from './users.service';
import { Observable } from 'rxjs';
@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newHeaders = req.headers;
    const user = JSON.parse(localStorage.getItem('user'));
    newHeaders = newHeaders.append('Authorization', 'Bearer ' + user.token);
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}

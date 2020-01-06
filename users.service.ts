import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  data$: Observable<any>;


  constructor(
    private http: HttpClient
  ) { }

async listUsers() {
  this.data$ = await this.http.get('http://localhost:5000/admin/getUserList');
  return this.data$;
}

handleError(error) {
  if (error.status === 401) {
    }
  // tslint:disable-next-line: deprecation
  return Observable.throw(error);
}
}

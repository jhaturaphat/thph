import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenInterceptor implements HttpInterceptor {

  constructor(
    private loginService:LoginService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token  = this.loginService.getToken();
    if(token){
      const clone = request.clone({headers: request.headers.set("Authorization",`Bearer ${token}`)});
      return next.handle(clone).pipe(catchError(error => {
        console.log("Intercapter Error : ", error);
        
        if(error.status === 401){
          this.router.navigate(['login'])
        }
        return throwError(error);
      }));
    }else{
      //  ถ้าในเครื่องไม่มี access_token ให้ไปที่หน้า login
      this.router.navigate(['login']);
      return next.handle(request)
    }
  }
  canCache(req: HttpRequest<any>):boolean {
    return req.urlWithParams.includes('')
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private access_token:string;
    private url:string; 
    constructor(
        private http:HttpClient,
        private jwtHelper: JwtHelperService
    ){
        this.access_token = "";
        this.url = environment.url+"/login";
    }

    onLogin(model:any) {
        return lastValueFrom(this.http.post(this.url, model)) as Promise<any>        
    }

    setToken(token:string) {
        sessionStorage.setItem(this.access_token, token);
    }

    getToken():string {
        return sessionStorage.getItem(this.access_token) as string;
    }

    clearToken():boolean {
        sessionStorage.removeItem(this.access_token);
        return true;
    }

    isTokenExpired(): boolean {        
        return this.jwtHelper.isTokenExpired(this.getToken());
    }
    
}
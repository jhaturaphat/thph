import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private access_token:string;
    private url:string; 
    constructor(
        private http:HttpClient
    ){
        this.access_token = "";
        this.url = environment.url+"/login";
    }

    onLogin(model:any) {
        return lastValueFrom(this.http.post(this.url, model)) as Promise<any>        
    }

    setToken(token:string) {
        localStorage.setItem(this.access_token, token);
    }

    getToken():string {
        return localStorage.getItem(this.access_token) as string;
    }

    clearToken():boolean {
        localStorage.removeItem(this.access_token);
        return true;
    }

}
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

    getProfile() {
        try{
            // 1. แยกเอาเฉพาะส่วน Payload (ส่วนที่ 2 ของ JWT)        
        const base64Url = this.getToken().split('.')[1];
        // 2. แปลง Base64Url เป็น Base64 มาตรฐาน (เปลี่ยน - เป็น + และ _ เป็น /)
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            // 3. ถอดรหัสและจัดการเรื่อง Unicode (ป้องกันปัญหาภาษาไทย/อักขระพิเศษ)
        const jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Invalid token format", error);
            return null;
        }
        
    }
    
}
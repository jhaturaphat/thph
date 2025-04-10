import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { ILabview } from "../interfaces/labview.interface";
// import 'rxjs/add/operator/toPromise';

@Injectable({
    providedIn: 'root'
  })

export class HisLabService{
    apiURL:string;   
    constructor(private http:HttpClient){
        this.apiURL = environment.url + '/his/lab';
    }

    find(lab_start_date:any, lab_end_date:any){
        return lastValueFrom(this.http.post(this.apiURL+'/lab-view', {lab_start_date, lab_end_date})) as Promise<ILabview[]>            
    }

    findVisitList(hn:any){
        return lastValueFrom(this.http.post(this.apiURL+'/visit-list',{hn})) as Promise<any>;
    }

    findLabHead(vn:string){
        return lastValueFrom(this.http.post(this.apiURL+'/lab-head',{vn})) as Promise<any>;
    }

    findLabOrder(oid:string){
        return lastValueFrom(this.http.post(this.apiURL+'/lab-order',{oid})) as Promise<any>;
    }    

    findLabResult(id:string){
        return lastValueFrom(this.http.post(this.apiURL+'/lab-result',{id})) as Promise<any>;
    }
    
}
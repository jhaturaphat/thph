import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
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
        /*return new Promise((resolve, reject) => {
            this.http.post(this.apiURL+'/lab-view', body).
            toPromise()
            .then(
                res => {
                    //console.log(res); 
                    resolve(res);                 
                },
                err => {
                    reject(err);
                }
            )
        });*/
    }
    
}
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GvmcarService {

  constructor(private http:HttpClient) { }

  url = environment.url + '/gvmcar';

  save(body:any){    
    this.http.get(this.url + '/reserve', {withCredentials: true })
    .subscribe((resp: any) => { return resp;}, 
    (errorResp) => {
      console.log( errorResp);
      
    })
  }

}

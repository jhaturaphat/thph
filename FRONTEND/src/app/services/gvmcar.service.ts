import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GvmcarService {

  constructor(private http:HttpClient) { }

  apiURL = environment.url + '/gvmcar';

  save(body:any){    
    return lastValueFrom(this.http.post(this.apiURL+'/reserve', body)) as Promise<any>    
  }

}

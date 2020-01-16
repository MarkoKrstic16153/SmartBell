import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Vezba from '../models/Vezba';

const url="http://localhost:3001/vezbe";

@Injectable({
  providedIn: 'root'
})
export class VezbaService {

private http:HttpClient;

  constructor(http: HttpClient) { //dependencu incejtion preavi instancu servisa
this.http=http;
    
  }
  getVezbe():Observable<Vezba[]>{
    return this.http.get<Vezba[]>(url)
  }
  postVezba(vezba:Vezba):Observable<any>
  {
    return this.http.post(url,vezba);
  }
  deleteVezba(id:string):Observable<any>{
    return this.http.delete(url+"/"+id);
  }
}

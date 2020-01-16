import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Trening from '../models/Trening';

const url="http://localhost:3001/trenings";

@Injectable({
  providedIn: 'root'
})
export class TreningsService {

private http:HttpClient;

  constructor(http: HttpClient) { //dependencu incejtion preavi instancu servisa
this.http=http;  
  }
  getTrenings(s:string):Observable<Trening[]>{
      console.log("ba");
    return this.http.get<Trening[]>(url+s)
  }
  postTrening(trening:Trening):Observable<any>
  {
    return this.http.post(url,trening);
  }
}
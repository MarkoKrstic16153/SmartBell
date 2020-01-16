import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../models/User';


const url="http://localhost:3001/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

private http:HttpClient;

  constructor(http: HttpClient) { //dependencu incejtion preavi instancu servisa
this.http=http;  
  }
  getUser(s:string):Observable<User[]>{
      console.log("ba");
    return this.http.get<User[]>(url+s)
  }
  postUser(user:User):Observable<any>
  {
    return this.http.post(url,user);
  }
  getUserId(s:string):Observable<User>{
    return this.http.get<User>(url+s);
  }
  putUser(s:string,user:User):Observable<any>{
    return this.http.put(url+s,user);
  }
}
///mozda dodaj npm install json-server;
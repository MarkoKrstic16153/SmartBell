import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userservice';
import User from '../models/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:User;
  greskaPassword:boolean=false;
  greskaEmail:boolean=false;
  noviEmail:string="def";
  noviPassword:string="def";
  load:boolean=false;
  constructor(private route : ActivatedRoute,private userService:UserService,private location:Location) { }

  ngOnInit() {
    this.route.params.subscribe( Params=>{
      const id=Params["id"];
      console.log(id);
      this.userService.getUserId("/"+id).subscribe(user=>{console.log(user);this.user=user;console.log("useo");console.log(this.user);this.noviPassword=this.user.password;this.noviEmail=this.user.email;this.load=true});
    });
  }
  onKeyPassword(event: KeyboardEvent) { // with type info
    this.noviPassword = (<HTMLInputElement>event.target).value;
    if(!this.noviPassword)
    {
        this.greskaPassword=true;
    }
    else{
      this.greskaPassword=false;
    }
    console.log(this.noviPassword);
  }
  onKeyEmail(event: KeyboardEvent) { // with type info
    this.noviEmail = (<HTMLInputElement>event.target).value;
    if(!this.noviEmail)
    {
        this.greskaEmail=true;
    }
    else{
      this.greskaEmail=false;
    }
    console.log(this.noviEmail);
  }
  save(){
    let s:string="/"+this.user.id;
    let noviUser:User={id:this.user.id,password:this.noviPassword,email:this.noviEmail};
    this.userService.putUser(s,noviUser).subscribe(()=>{});
    this.location.back();
  }
  nazad(){
    this.location.back();
  }
  
}

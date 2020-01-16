import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userservice';
import User from '../models/User';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Vezba from '../models/Vezba';
import * as fromPizza from '../store/vezbe.reducer';
import { Store } from '@ngrx/store';
import { FetchVezbe, SelectTrening } from '../store/vezbe.actions';
import DeoTreninga from '../models/DeoTreninga';
import Trening from '../models/Trening';
import { TreningsState, selectAll, selectTotal } from '../store/trenings.reducer';
import { FetchTrenings, PostTrening, AddTrenings } from '../store/trenings.actions';
import { State } from '../store';

@Component({
  selector: 'app-trenings',
  templateUrl: './trenings.component.html',
  styleUrls: ['./trenings.component.css']
})
export class TreningsComponent implements OnInit {
vrste:string[]=['FullBody','Push','Pull','Legs','BroArms','BroChest','Calisthenics'];
username:string;
password:string="";
ulogovan:boolean=false;
loginGreska:boolean=false;
signInGreska:boolean=false;
greskaUsername:boolean=true;
noviUsername:string="";
noviPassword:string="";
noviEmail:string="";
trenutnoUlogovani:string="";
users:User[]=[];
vrstaTreninga:string="FullBody";
trenutnaVezba:string="";
tezina:number=0;
repeticije:number=0;
serije:number=0;
date=new FormControl(new Date());
public vezbe$:Observable<Vezba[]>;
public treninzi$:Observable<Trening[]>;
noviDelovi:DeoTreninga[]=[];
kalorije:number=0;
noviTrening:Trening;
selektovaniId:number;
filterZaTreninge:string;
staPrikazuje:string="";
ubaceneVezbe:string[]=[];
trenutniBrojTreninga$:Observable<number>;
trenutniBrojTreninga:number=0;
subKalorije:number=0;
  constructor(private userService: UserService,private storeVezbe:Store<fromPizza.VezbaState>,private storeTrenings:Store<TreningsState>,private store1:Store<State>) { }

  ngOnInit() {
    this.store1.select(store=>store.selectedTrening)
    .subscribe(trenId=>{
      this.selektovaniId=trenId;
      console.log("Subscribe "+this.selektovaniId);
    });
    this.storeVezbe.dispatch(new FetchVezbe());
    this.vezbe$=this.storeVezbe.select(fromPizza.selectAll); 
  }
onKeyUsername(event: KeyboardEvent) { // with type info
  this.username = (<HTMLInputElement>event.target).value;
  if(!this.username)
  {
      this.greskaUsername=true;
  }
  else{
    this.greskaUsername=false;
  }
}
onKeyPasswordS(event: KeyboardEvent) { // with type info
  this.noviPassword = (<HTMLInputElement>event.target).value;
}
onKeyUsernameS(event: KeyboardEvent) { // with type info
  this.noviUsername = (<HTMLInputElement>event.target).value;
}

onKeyPassword(event: KeyboardEvent) { // with type info
  this.password = (<HTMLInputElement>event.target).value;
}
onKeyEmail(event: KeyboardEvent) { // with type info
  this.noviEmail = (<HTMLInputElement>event.target).value;
  console.log(this.noviEmail);
}
loguj(){
  let s:string="?id="+this.username+"&password="+this.password;
  this.userService.getUser(s).subscribe(users=>{console.log(users);this.users=users;if(this.users.length==0)this.loginGreska=true;else {this.ulogovan=true;this.trenutnoUlogovani=this.username;this.fetchTreninzi();}});
}
fetchTreninzi(){
this.storeTrenings.dispatch(new FetchTrenings("?user="+this.trenutnoUlogovani));
this.treninzi$=this.storeTrenings.select(selectAll);
this.trenutniBrojTreninga$=this.storeTrenings.select(selectTotal);
this.trenutniBrojTreninga$.subscribe((broj)=>{this.trenutniBrojTreninga=broj})
this.treninzi$.subscribe((treninzi)=>{this.subKalorije=0;treninzi.forEach((trening:Trening)=>{this.subKalorije+=trening.kalorije})})
console.log(this.treninzi$);
}
signup(){
 let s:string="?id="+this.noviUsername+"&password="+this.noviPassword;
 this.userService.getUser(s).subscribe(users=>{console.log(users);this.users=users;if(this.users.length!=0)this.signInGreska=true;else this.dodaj()});
}
dodaj(){
  console.log("dodaje");
  this.userService.postUser({id:this.noviUsername,password:this.noviPassword,email:this.noviEmail}).subscribe(igrac=>{this.ulogovan=true;this.trenutnoUlogovani=igrac.id;this.fetchTreninzi();});
}
ajde(event:any){
  this.date=event;
  let s:string=this.date.value;
  console.log(s);
}
opt(event: MouseEvent) { // with type info
  this.tezina = +(<HTMLInputElement>event.target).value;
  console.log(this.tezina);
}
serijes(event: MouseEvent) { // with type info
  this.serije = +(<HTMLInputElement>event.target).value;
  console.log(this.serije);
}
rep(event: MouseEvent) { // with type info
  this.repeticije = +(<HTMLInputElement>event.target).value;
  console.log(this.repeticije);
}
filter(){
  console.log(this.vrstaTreninga);
}
selectTrening(trening)
{
  console.log(trening);
this.vrstaTreninga=trening;
console.log(this.vrstaTreninga);
}
dodajVolume()
{
  this.noviDelovi.push({naziv:this.trenutnaVezba,opterecenje:this.tezina,serije:this.serije,repeticije:this.repeticije});
  console.log(this.noviDelovi);
  const a=this.tezina*9.81*this.serije*this.repeticije;
  console.log("a je "+a);
  this.kalorije*=4184;
  this.kalorije+=a;
  console.log(this.kalorije);
  this.kalorije/=4184;
  
}
delDeo(index)
{
  console.log(index);
  this.kalorije-=(this.noviDelovi[index].opterecenje*this.noviDelovi[index].repeticije*this.noviDelovi[index].serije*9.81)/4184
  this.noviDelovi.splice(index,1);
}
addTrening(){
  this.noviTrening={vrstaTreninga:this.vrstaTreninga,delovi:this.noviDelovi,kalorije:this.kalorije,datum:this.date.value,user:this.trenutnoUlogovani};
  console.log(this.noviTrening);
  this.noviDelovi=[];
  this.kalorije=0;
  this.storeTrenings.dispatch(new PostTrening(this.noviTrening));
}
ocisti()
{
  this.staPrikazuje="";
  this.storeTrenings.dispatch(new FetchTrenings("?user="+this.trenutnoUlogovani));
  this.store1.dispatch(new SelectTrening(-1));
}
pretrazi(){
  console.log("Filtrira "+this.filterZaTreninge);
  let pomTreninzi:Trening[]=[];
  this.treninzi$.forEach((treninzi:Trening[])=>{treninzi.forEach((trening:Trening)=>{if(trening.vrstaTreninga==this.filterZaTreninge)pomTreninzi.push(trening)})});
  this.storeTrenings.dispatch(new AddTrenings(pomTreninzi));
  this.staPrikazuje=this.filterZaTreninge;
}
menjaj(){
  this.ubaceneVezbe=[];
  this.noviDelovi=[];
  this.kalorije=0;
  console.log(this.vrstaTreninga);
  this.vezbe$.forEach((vezbe:Vezba[])=>vezbe.forEach((vezba:Vezba) => {
    switch(this.vrstaTreninga)
    {
      case 'FullBody':{
        this.ubaceneVezbe.push(vezba.naziv);
        break;
      }
      case 'Push':{
        vezba.misiceKojiPogadja.forEach((misic:string)=>{if(misic=='Grudi' || misic=='Triceps' || misic=='Ramena'){this.ubaceneVezbe.push(vezba.naziv);}})
        break;
      }
      case 'Pull':{
        vezba.misiceKojiPogadja.forEach((misic:string)=>{if(misic=='Trapezi' || misic=='Lepeze' || misic=='Biceps' || misic=='Loza')this.ubaceneVezbe.push(vezba.naziv)})
        break;
      }
      case 'Legs':{
        vezba.misiceKojiPogadja.forEach((misic:string)=>{if(misic=='Butine' || misic=='Loza' || misic=='Listovi')this.ubaceneVezbe.push(vezba.naziv)})
        break;
      }
      case 'BroArms':{
        vezba.misiceKojiPogadja.forEach((misic:string)=>{if(misic=='Biceps' || misic=='Triceps')this.ubaceneVezbe.push(vezba.naziv)})
        break;
      }
      case 'BroChest':{
        vezba.misiceKojiPogadja.forEach((misic:string)=>{if(misic=='Grudi')this.ubaceneVezbe.push(vezba.naziv)})
        break;
      }
      case 'Calisthenics':{
       if(vezba.koristiMasine==false && vezba.koristiTegove==false)
       this.ubaceneVezbe.push(vezba.naziv);
        break;
      }
    } 
  }));
  let unique = [...new Set(this.ubaceneVezbe)];
  console.log(this.ubaceneVezbe);
  console.log(unique);
  this.ubaceneVezbe=unique;
}
}

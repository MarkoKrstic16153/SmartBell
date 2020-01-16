import { Component, OnInit } from '@angular/core';
import Vezba from '../models/Vezba';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { Observable } from 'rxjs';
import { PostVezba, FetchVezbe, AddVezbe } from '../store/vezbe.actions';
import * as fromVezba from '../store/vezbe.reducer';
import { SelectVezba } from '../store/vezba.actions';

@Component({
  selector: 'app-vezbe',
  templateUrl: './vezbe.component.html',
  styleUrls: ['./vezbe.component.css']
})
export class VezbeComponent implements OnInit {
 public misici:string[]=['Grudi','Lepeze','Trapezi','Trbusnjaci','Butine','Listovi','Biceps','Triceps','Loza','Ramena','Podlaktica'];
 public novoIme:string;
 public tegovi:boolean=false;
 public masina:boolean=false;
 public kondicija:boolean=false;
 public tegFilter:boolean=false;
 public masFilter:boolean=false;
 public kondFilter:boolean=false;
 public novapartija:string;
 public trenutnaUkupnaPartija:string[]=[];
 public greska:boolean=true;
 public vezbe$:Observable<Vezba[]>;
 public filter:string;
 public filtriraneVezbe:Vezba[]=[];
 public selektovanaVezba:string;
 public sufix:string="";
  constructor(private store:Store<fromVezba.VezbaState>,private store1:Store<State>) { }

  ngOnInit() {
    this.store1.select(store=>store.selectedMovie)
    .subscribe(movieId=>{
      this.selektovanaVezba=movieId;
    });
    this.store.dispatch(new FetchVezbe());
    this.vezbe$=this.store.select(fromVezba.selectAll);
  }
  onKey(event: KeyboardEvent) { // with type info
    this.novoIme = (<HTMLInputElement>event.target).value;
    if(!this.novoIme)
    {
        this.greska=true;
    }
    else{
      this.greska=false;
    }
    console.log(this.novoIme);
  }
  fteg(event:any){
    this.tegFilter=event.checked;
    console.log(this.tegovi+ " "+this.novapartija);
  }
  fmas(event:any){
    this.masFilter=event.checked;
    console.log(this.masina);
  }
  fkond(event:any){
    this.kondFilter=event.checked;
    console.log(this.kondicija);
  }
  teg(event:any){
    this.tegovi=event.checked;
    console.log(this.tegovi+ " "+this.novapartija);
  }
  mas(event:any){
    this.masina=event.checked;
    console.log(this.masina);
  }
  kond(event:any){
    this.kondicija=event.checked;
    console.log(this.kondicija);
  }

  addGrupu()
  {
    if(!this.novapartija)
    return;
   this.trenutnaUkupnaPartija= this.trenutnaUkupnaPartija.filter((s:string)=>s!=this.novapartija);
    this.trenutnaUkupnaPartija.push(this.novapartija);
    console.log(this.trenutnaUkupnaPartija);
  }
  delGrupu(par:string)
  {
    this.trenutnaUkupnaPartija=this.trenutnaUkupnaPartija.filter((s:string)=>s!=par);
  }
  addVezba()
  {
    if(!this.novoIme || this.trenutnaUkupnaPartija.length==0)
    {
      this.greska=true;
      console.log("Neuspesni Unos");
    }
    else{
      console.log("uspesni Unos");
      this.store.dispatch(new PostVezba({id:this.novoIme,naziv:this.novoIme,koristiMasine:this.masina,koristiTegove:this.tegovi,pojacavaKondiciju:this.kondicija,misiceKojiPogadja:this.trenutnaUkupnaPartija}));
      this.trenutnaUkupnaPartija=[];
    }
  }
  filtriraj(){
    if(!this.filter)
    {
      return;
    }
    else{
      console.log("Filtrira "+this.filter);
      this.sufix+=this.filter+" ";
      this.vezbe$.forEach((vezbe:Vezba[])=>{vezbe.forEach((vezba:Vezba)=>{vezba.misiceKojiPogadja.forEach((str:string)=>{if(str==this.filter)this.filtriraneVezbe.push(vezba)})})})
      console.log(this.filtriraneVezbe);
      this.store.dispatch(new AddVezbe(this.filtriraneVezbe));
      this.filtriraneVezbe=[];
      this.filter="";
    }
  }
  vratiPocetneVezbe(){
    this.sufix="";
    this.store.dispatch(new FetchVezbe());
    this.vezbe$=this.store.select(fromVezba.selectAll);
    this.store1.dispatch(new SelectVezba(""));
  }
  boolFilter(){
    let n :number= this.sufix.indexOf('(');
    console.log("Index je "+n);
    this.sufix = this.sufix.substring(0, n != -1 ? n : this.sufix.length);
    if(this.masFilter)this.sufix+=" (Masine)";
    if(this.tegFilter)this.sufix+=" (Tegovi)";
    if(this.kondFilter)this.sufix+=" (Kondicija)";
    this.vezbe$.forEach((vezbe:Vezba[])=>{vezbe.forEach((vezba:Vezba)=>{if(this.tegFilter==vezba.koristiTegove && this.masFilter==vezba.koristiMasine && this.kondFilter==vezba.pojacavaKondiciju)this.filtriraneVezbe.push(vezba)})})
    console.log(this.filtriraneVezbe);
    this.store.dispatch(new AddVezbe(this.filtriraneVezbe));
    this.filtriraneVezbe=[];
  }
}

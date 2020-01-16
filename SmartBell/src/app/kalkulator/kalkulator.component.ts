import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.css']
})
export class KalkulatorComponent implements OnInit {
aktivnosti:string[]=['Sedelacki nacin zivota','Blaga aktivnost(1-2 nedeljno)','Umerena aktivnost(3-4 nedeljno)','Visoka aktivnost(5-6 nedeljno)','Ekstremna aktivnost(2 puta dnevno)'];
ciljevi:string[]=['Brzi Gubitak','Spori Gubitak','Odrzavanje','Sporo Dodavanje','Brzo Dodavanje'];
pol:string="";
nivoAktivnosti:string="";
tezina:number;
visina:number;
godine:number;
greskaGodine:boolean=true;
greskaVisina:boolean=true;
greskaTezina:boolean=true;
proteini:number=0;
kalorije:number=0;
izracunato:boolean=false;
zeljeniCilj:string="";
  constructor() { }

  ngOnInit() {
  }

  onKeyTezina(event: KeyboardEvent) { // with type info
    this.tezina = +(<HTMLInputElement>event.target).value;
    if(!this.tezina)
    {
        this.greskaTezina=true;
    }
    else{
      this.greskaTezina=false;
    }
    console.log(this.tezina);
  }

  onKeyVisina(event: KeyboardEvent) { // with type info
    this.visina = +(<HTMLInputElement>event.target).value;
    if(!this.visina)
    {
        this.greskaVisina=true;
    }
    else{
      this.greskaVisina=false;
    }
    console.log(this.visina);
  }

  onKeyGodine(event: KeyboardEvent) { // with type info
    this.godine = +(<HTMLInputElement>event.target).value;
    if(!this.godine)
    {
        this.greskaGodine=true;
    }
    else{
      this.greskaGodine=false;
    }
    console.log(this.godine);
  }

izracunaj(){
  this.kalorije=0;
  this.proteini=0;
  this.izracunato=true;
  console.log(this.pol);
  console.log(this.nivoAktivnosti);
  let aktivnostKoef:number;
  let ciljKoef:number;
  switch(this.zeljeniCilj)
{
  case 'Brzi Gubitak':{
    ciljKoef=0.8;
    break;
  }
  case 'Spori Gubitak':{
    ciljKoef=0.9;
    break;
  }
  case 'Odrzavanje':{
    ciljKoef=1;
    break;
  }
  case 'Sporo Dodavanje':{
    ciljKoef=1.1;
    break;
  }
  case 'Brzo Dodavanje':{
    ciljKoef=1.2;
    break;
  }
}
switch(this.nivoAktivnosti)
{
  case 'Sedelacki nacin zivota':{
aktivnostKoef=0.8;
break;
  }
  case 'Blaga aktivnost(1-2 nedeljno)':{
    aktivnostKoef=0.95;
    break;
  }
  case 'Umerena aktivnost(3-4 nedeljno)':{
    aktivnostKoef=1.1;
    break;
  }
  case 'Visoka aktivnost(5-6 nedeljno)':{
    aktivnostKoef=1.25;
    break;
  }
  case 'Ekstremna aktivnost(2 puta dnevno)':{
    aktivnostKoef=1.40;
    break;
  }
}
console.log("aktivnost koef :"+aktivnostKoef+" cijkoef "+ciljKoef);
let finalKoef:number=aktivnostKoef*ciljKoef;
if(this.pol=='Muski')
{
this.kalorije=66.473+(16.7516*this.tezina)+(7.5033*this.visina)-(6.7550*this.godine);
this.proteini=this.tezina*1.75;
}
else{
this.kalorije=655.095+(12.1034*this.tezina)+(4.5496*this.visina)-(4.6756*this.godine);
this.proteini=this.tezina*1.3;
}
this.proteini*=aktivnostKoef;
this.kalorije*=finalKoef;
}
}

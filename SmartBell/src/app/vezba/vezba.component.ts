import { Component, OnInit ,Input} from '@angular/core';
import Vezba from '../models/Vezba';
import { Store } from '@ngrx/store';
import * as fromPizza from '../store/vezbe.reducer';
import { RemoveVezba } from '../store/vezbe.actions';
import { State } from '../store';
import { SelectVezba } from '../store/vezba.actions';

@Component({
  selector: 'app-vezba',
  templateUrl: './vezba.component.html',
  styleUrls: ['./vezba.component.css']
})
export class VezbaComponent implements OnInit {
  @Input()
vezba:Vezba;
@Input()
vise:boolean=false;
mas:string;
teg:string;
kond:string;

  constructor(private store:Store<fromPizza.VezbaState>,private store1:Store<State>) {
    
   }

  ngOnInit() {
    if(this.vezba.koristiMasine==true)
      this.mas="Da";
    else this.mas="Ne";
    if(this.vezba.koristiTegove==true)
      this.teg="Da";
      else
      this.teg="Ne";
      if(this.vezba.pojacavaKondiciju==true)
      this.kond="Da";
      else
      this.kond="Ne";
  }
delVezbu(){
  this.store.dispatch(new RemoveVezba(this.vezba.id));
}
detalji(){
  this.store1.dispatch(new SelectVezba(this.vezba.id));
}
}

import { Component, OnInit, Input } from '@angular/core';
import Trening from '../models/Trening';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { SelectTrening } from '../store/vezbe.actions';

@Component({
  selector: 'app-trening',
  templateUrl: './trening.component.html',
  styleUrls: ['./trening.component.css']
})
export class TreningComponent implements OnInit {
@Input()
trening:Trening;
@Input()
detalji:boolean;

  constructor(private store:Store<State>) { }

  ngOnInit() {
    
    console.log(this.detalji);
  }
  posalji(){
    this.store.dispatch(new SelectTrening(this.trening.id));
  }

}

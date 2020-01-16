import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap ,catchError} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {Observable,of} from "rxjs";

import { TreningsService } from '../services/treningsservice';
import { FETCH_TRENINGS, FetchTrenings, AddTrening, AddTrenings, PostTrening, POST_TRENING } from '../store/trenings.actions';
import Trening from '../models/Trening';
 
@Injectable()
export class TreningsEffects {
 
  @Effect()
  loadTrenings$ : Observable<Action>= this.actions$
    .pipe(
      ofType<FetchTrenings>(FETCH_TRENINGS),
      mergeMap((actions:FetchTrenings) => this.treningsService.getTrenings(actions.filter)
        .pipe(
          map((trenings:Trening[]) => new AddTrenings(trenings))
         // catchError((err) =>(EMPTY))
        ))
      )
    //);
    @Effect()
    postTrening=this.actions$.pipe(
        ofType<PostTrening>(POST_TRENING),
        mergeMap((actions:PostTrening)=>this.treningsService.postTrening(actions.trening)
        .pipe(
            map((trening:Trening)=>new AddTrening(trening))
        )
        )
    )
  
  constructor(
    private actions$: Actions,
    private treningsService: TreningsService
  ) {console.log("aaaa");}
}
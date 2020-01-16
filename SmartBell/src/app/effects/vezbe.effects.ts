import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap ,catchError} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {Observable,of} from "rxjs";
import { VezbaService } from '../services/vezbeservice';
import { FETCH_VEZBE, FetchVezbe, AddVezba, AddVezbe,POST_VEZBA, PostVezba, RemoveVezba, REMOVE_VEZBA, DeleteVezba } from '../store/vezbe.actions';
import Vezba from '../models/Vezba';
 
@Injectable()
export class VezbeEffects {
 
  @Effect()
  loadVezbe$ : Observable<Action>= this.actions$
    .pipe(
      ofType<FetchVezbe>(FETCH_VEZBE),
      mergeMap((actions:FetchVezbe) => this.vezbeService.getVezbe()
        .pipe(
          map((vezbe:Vezba[]) => new AddVezbe(vezbe))
         // catchError((err) =>(EMPTY))
        ))
      )
    //);
    @Effect()
   /* postMovie=this.actions$.pipe(
        ofType<PostMovie>(POST_MOVIE),
        mergeMap((actions:PostMovie)=>this.moviesService.postMovie(actions.movie)
        
    )
    )*/
    postVezba=this.actions$.pipe(
        ofType<PostVezba>(POST_VEZBA),
        mergeMap((actions:PostVezba)=>this.vezbeService.postVezba(actions.vezba)
        .pipe(
            map((vezba:Vezba)=>new AddVezba(vezba))
        )
        )
    )
    @Effect()
    delMovie=this.actions$.pipe(
      ofType<RemoveVezba>(REMOVE_VEZBA),
      mergeMap((action:RemoveVezba)=>this.vezbeService.deleteVezba(action.vezbaId)
      .pipe(
        map(()=>new DeleteVezba(action.vezbaId))
      )
      )
    )

 
  constructor(
    private actions$: Actions,
    private vezbeService: VezbaService
  ) {console.log("aaaa");}
}
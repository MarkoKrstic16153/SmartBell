import { ActionReducerMap } from '@ngrx/store';
import {vezbeReducer} from './vezbe.reducer';
import mojREdu, { selectedTreningReducer } from './selectedReducer';
import { treningsReducer } from './trenings.reducer';
export interface State 
{
    selectedMovie:string;
    selectedTrening:number;
}

export const rootReducer: ActionReducerMap<any>={
    selectedMovie:mojREdu,
    vezbe:vezbeReducer,
    trenings:treningsReducer,
    selectedTrening:selectedTreningReducer,
    
};
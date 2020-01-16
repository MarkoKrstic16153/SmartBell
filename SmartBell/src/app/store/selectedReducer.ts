import { Action } from '@ngrx/store';
import { SELECT_VEZBA, SelectVezba } from './vezba.actions';
import { SELECT_TRENING, SelectTrening } from './vezbe.actions';

export default function reducer(state:string="",action:Action)
{
    switch(action.type)
    {
        case SELECT_VEZBA:{
            console.log("jos neko");
            const {vezbaId} =action as SelectVezba;
            return vezbaId;
        }
        default: return state;
    }
}

export function selectedTreningReducer(state:number=-1,action:Action)
{
    switch(action.type)
    {
        case SELECT_TRENING:{
            console.log("jos neko");
            const {id} =action as SelectTrening;
            console.log(id);
            return id;
        }
        default: return state;
    }
}
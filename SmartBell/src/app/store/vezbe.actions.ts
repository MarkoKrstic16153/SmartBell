import { Action } from '@ngrx/store';
import Vezba from '../models/Vezba';

export const ADD_VEZBA="[Add vezba]";
export const DELETE_VEZBA="[Delete vezba]";
export const FETCH_VEZBE="[Fetch vezbe]";
export const POST_VEZBA="[Post vezba]";
export const REMOVE_VEZBA="[Remove vezba]";
export const ADD_VEZBE="[Add vezbe]";
export const FILTER_VEZBE="[Filter vezbe]";
export const SELECT_TRENING="[Select trening]";

export class AddVezba implements Action{
    type=ADD_VEZBA;
    constructor(public vezba:Vezba){}
}
export class PostVezba implements Action{
    type=POST_VEZBA;
    constructor(public vezba:Vezba){}
}
export class DeleteVezba implements Action{
    type=DELETE_VEZBA;
    constructor(public vezbaId:string){}
}
export class RemoveVezba implements Action{
    type=REMOVE_VEZBA;
    constructor(public vezbaId:string){}
}
export class FetchVezbe implements Action{
    type=FETCH_VEZBE;
    constructor(){}
}
export class AddVezbe implements Action{
    type=ADD_VEZBE;
    constructor(public vezbe:Vezba[]){}
}
export class FilterVezbe implements Action{
type=FILTER_VEZBE;
constructor(misic:string){}
}
export class SelectTrening implements Action{
    type=SELECT_TRENING;
    constructor(public id:number){}
}
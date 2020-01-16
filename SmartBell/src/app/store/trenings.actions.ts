import { Action } from '@ngrx/store';
import Trening from '../models/Trening';

export const FETCH_TRENINGS="[Fetch trenings]";
export const ADD_TRENINGS="[Add trenings]";
export const POST_TRENING="[Post trening]";
export const ADD_TRENING="[Add trening]";
export const FILTER_TRENINGS="[Filter trenings]";

export class FetchTrenings implements Action{
    type=FETCH_TRENINGS;
    constructor(public filter:string){}
}
export class AddTrenings implements Action{
    type=ADD_TRENINGS;
    constructor(public trenings:Trening[]){}
}
export class PostTrening implements Action{
    type=POST_TRENING;
    constructor(public trening:Trening){}
}
export class AddTrening implements Action{
    type=ADD_TRENING;
    constructor(public trening:Trening){}
}
export class FilterTrenings implements Action{
    type=FILTER_TRENINGS;
    constructor(public filter:string[]){}
}
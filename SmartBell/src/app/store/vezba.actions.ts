import { Action } from '@ngrx/store';

export const SELECT_VEZBA="[Select movie]";

export class SelectVezba implements Action{
    type=SELECT_VEZBA;
    constructor(public vezbaId:string){}
}


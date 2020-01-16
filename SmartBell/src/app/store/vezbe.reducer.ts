import { Action } from '@ngrx/store';
import { ADD_VEZBA, AddVezba, DELETE_VEZBA, ADD_VEZBE, AddVezbe, DeleteVezba, FILTER_VEZBE } from './vezbe.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import Vezba from '../models/Vezba';


export const vezbeAdapter= createEntityAdapter<Vezba>();
export interface VezbaState extends EntityState<Vezba>{ }

    const defaultVezbe={
        ids:[],
        entities:{

        }
    }

    export const inicijalneVezbe:VezbaState = vezbeAdapter.getInitialState(defaultVezbe);
    export function vezbeReducer(state:VezbaState=defaultVezbe,action:Action)
    {
            switch(action.type)
            {
                case ADD_VEZBA:{
                    console.log("AAAAAAAAAAAAAAAAA");
                    const {vezba}=action as AddVezba;
                    return vezbeAdapter.addOne(vezba,state);
                }
                case DELETE_VEZBA:{
                        const {vezbaId}=action as DeleteVezba;
                        return vezbeAdapter.removeOne(vezbaId,state);
                }
                case ADD_VEZBE:{
                    const {vezbe}=action as AddVezbe;
                    console.log("Iz fetch");
                    console.log(vezbe);
                    vezbeAdapter.removeAll(state);
                    return vezbeAdapter.addAll(vezbe,state);           
                }
                default:return state;
            }
    }

    export const getVezbeState= createFeatureSelector<VezbaState>('vezbe');
    export const {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
      } = vezbeAdapter.getSelectors(getVezbeState);



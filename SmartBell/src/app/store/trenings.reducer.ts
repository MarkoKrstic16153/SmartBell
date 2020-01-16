import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import Trening from '../models/Trening';
import { ADD_TRENINGS, AddTrenings, ADD_TRENING, AddTrening, FILTER_TRENINGS ,FilterTrenings} from './trenings.actions';

export const treningsAdapter= createEntityAdapter<Trening>();
export interface TreningsState extends EntityState<Trening>{ }

const defaultTrenings={
    ids:[],
    entities:{

    }
}

export const inicijalneVezbe:TreningsState = treningsAdapter.getInitialState(defaultTrenings);

export function treningsReducer(state:TreningsState=defaultTrenings,action:Action)
{
    switch(action.type)
            {
                case ADD_TRENINGS:{
                    const {trenings}=action as AddTrenings;
                    treningsAdapter.removeAll(state);
                    return treningsAdapter.addAll(trenings,state); 
                }
                case ADD_TRENING:{
                    const {trening}=action as AddTrening;
                    return treningsAdapter.addOne(trening,state);
                }
                case FILTER_TRENINGS:{
                    const {filter}=action as FilterTrenings;
                    treningsAdapter.removeMany(filter,state);
                }
                default:return state;   
            }
}

export const getTreningsState= createFeatureSelector<TreningsState>('trenings');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = treningsAdapter.getSelectors(getTreningsState);
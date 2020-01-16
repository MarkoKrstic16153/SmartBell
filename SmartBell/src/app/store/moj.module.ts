import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCheckboxModule,MatInputModule,MatSelectModule,MatButtonModule,MatListModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {vezbeReducer} from './vezbe.reducer';
import {VezbeComponent} from '../vezbe/vezbe.component';
import {VezbaComponent} from '../vezba/vezba.component';
import { TreningsComponent } from '../trenings/trenings.component';
import { TreningComponent } from '../trening/trening.component';
import { KalkulatorComponent } from '../kalkulator/kalkulator.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material';
import { treningsReducer } from './trenings.reducer';
import { ProfilComponent } from '../profil/profil.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatExpansionModule,
    StoreModule.forFeature('vezbe',vezbeReducer),
    StoreModule.forFeature('trenings',treningsReducer)
  ],
  exports: [VezbaComponent,VezbeComponent,TreningsComponent,TreningComponent,KalkulatorComponent,ProfilComponent],
  declarations: [VezbaComponent,VezbeComponent,TreningsComponent,TreningComponent,KalkulatorComponent,ProfilComponent]
})
export class MojModule { }
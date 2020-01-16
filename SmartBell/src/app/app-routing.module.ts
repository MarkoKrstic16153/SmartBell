import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VezbeComponent } from './vezbe/vezbe.component';
import { TreningsComponent } from './trenings/trenings.component';
import { KalkulatorComponent } from './kalkulator/kalkulator.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'vezbe',component:VezbeComponent},
  {path:'trenings',component:TreningsComponent},
  {path:'kalkulator',component:KalkulatorComponent},
  {path:'trenings/:id',component:ProfilComponent},
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store';
import { MojModule } from './store/moj.module';
import { VezbeEffects } from './effects/vezbe.effects';
import {MatNativeDateModule} from '@angular/material';
import { TreningsEffects } from './effects/trenings.effects';
import { HomeComponent } from './home/home.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    MojModule,
    MatNativeDateModule,
    EffectsModule.forRoot([VezbeEffects,TreningsEffects]),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

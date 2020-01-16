import { EffectsModule } from '@ngrx/effects';
import { VezbeEffects } from './vezbe.effects';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    EffectsModule.forFeature([VezbeEffects])
  ],
})
export class MovieModule {}
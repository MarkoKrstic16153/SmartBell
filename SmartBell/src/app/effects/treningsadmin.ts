import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';
import { TreningsEffects } from './trenings.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([TreningsEffects])
  ],
})
export class MovieModule {}
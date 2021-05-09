import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersComponent } from './providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
    data: {
      title: 'Providers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule {}

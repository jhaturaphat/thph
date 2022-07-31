import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'gvmcar',
    loadChildren: () => import('./shared/modules/gvmcar.module').then(m=>m.GvmCarModule)
  },
  {
    path:'his',
    loadChildren: () => import('./shared/modules/his.module').then(m=>m.HisModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

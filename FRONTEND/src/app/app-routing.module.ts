import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AppUrl} from './URL';

const routes: Routes = [
  // {
  //   path:'',
  //   component:DashboardComponent
  // },    
  {
    path:AppUrl.Login,
    component:LoginComponent
  },
  {
    path:'',
    loadChildren: () => import('./shared/modules/his.module').then(m=>m.HisModule)
  },
  {
    path:AppUrl.Labview,
    loadChildren: () => import('./shared/modules/his.module').then(m=>m.HisModule)
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

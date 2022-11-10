import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasListComponent } from './views/gas-list/gas-list.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '/gasolineras', component: GasListComponent },
  { path: '/home', component: HomeComponent },

  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SchedularComponent } from './schedular/schedular.component'
import { AppComponent } from './app.component';
import { TeamFormComponent } from './team-form/team-form.component';



const routes: Routes = [ 
//{ path: '', component: SchedularComponent},
{ path: 'teams', component: TeamFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

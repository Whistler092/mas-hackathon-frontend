import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecorderComponent } from './components/recorder/recorder.component';
import { CatchedComponent } from './components/catched/catched.component';

const routes: Routes = [
  { path: '', redirectTo: 'recorder', pathMatch: 'full' },
  { path: 'recorder', component: RecorderComponent },
  { path: 'receptor', component: CatchedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const declaredComponents = [RecorderComponent, CatchedComponent];

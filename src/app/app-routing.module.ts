import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecorderComponent } from './detector/components/recorder/recorder.component';

const routes: Routes = [
  { path: '', redirectTo: 'recorder', pathMatch: 'full' },
  { path: 'recorder', component: RecorderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

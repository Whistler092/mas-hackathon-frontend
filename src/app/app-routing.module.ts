import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecorderComponent } from './components/recorder/recorder.component';
import { CatchedComponent } from './components/catched/catched.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recorder', component: RecorderComponent, canActivate: [AuthGuard] },
  { path: 'receptor', component: CatchedComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const declaredComponents = [
  RecorderComponent,
  CatchedComponent,
  LoginComponent,
];

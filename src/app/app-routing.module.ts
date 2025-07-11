import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

console.log('App Routing Module Loaded!');
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customer-form', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
console.log('Routes configured:', routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
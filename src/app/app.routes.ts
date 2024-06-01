import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { authGuard } from './guards/auth.guard';
import { GrandMenuComponent } from './pages/grand-menu/grand-menu.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent, canActivate: [authGuard] },
    { path: 'grand-menu', component: GrandMenuComponent, canActivate: [authGuard] },

    { path: '**', redirectTo: 'login' } // Redirect all unknown routes to login

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
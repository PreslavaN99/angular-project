import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AdminPanelComponent} from './components/adminPanel/admin.panel.component';
import {AnimalAddComponent} from './components/animal/add/animal-add.component';
import {ManageAnimalComponent} from './components/animal/manage/manage-animal.component';
import {AnimalByIdComponent} from './components/animal/byId/animal-by-id.component';
import {AllAnimalsComponent} from './components/animal/all/all-animals.component';
import {AnimalComponent} from './components/animal/view/animal.component';
import {AccountComponent} from './components/account/account.component';
import {AnimalFindComponent} from './components/animal/find/animal-find.component';
import {NoDataComponent} from './components/noData/no-data.component';

import {AuthGuard} from './guards/AuthGuard';
import {NoAuthGuard} from './guards/NoAuthGuard';
import {AdminGuard} from './guards/AdminGuard';
import {LayoutComponent} from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},

      // Public routes for unauthenticated users
      {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},

      // Authenticated routes
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animal-add',
        component: AnimalAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animal-manage',
        component: ManageAnimalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animal/:id',
        component: AnimalByIdComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animal-find',
        component: AnimalFindComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'find-all',
        component: AllAnimalsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'animal-read/:id',
        component: AnimalComponent,
        canActivate: [AuthGuard]
      },

      // Admin-only routes
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard]
      },

      // Catch-all (404 page)
      {path: '**', component: NoDataComponent}
    ]
  }]
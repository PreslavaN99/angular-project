import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RegisterComponent} from './components/register/register.component';
import {AdminPanelComponent} from './components/adminPanel/admin.panel.component';
import {AnimalAddComponent} from './components/animal/add/animal-add.component';
import {ManageAnimalComponent} from './components/animal/manage/manage-animal.component';
import {AnimalByIdComponent} from './components/animal/byId/animal-by-id.component';
import {AllAnimalsComponent} from './components/animal/all/all-animals.component';
import {AnimalComponent} from './components/animal/view/animal.component';
import {AccountComponent} from './components/account/account.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'admin', component: AdminPanelComponent},
      {path: 'animal-add', component: AnimalAddComponent},
      {path: 'animal-manage', component: ManageAnimalComponent},
      {path: 'animal/:id', component: AnimalByIdComponent},
      {path: 'find-all', component: AllAnimalsComponent},
      {path: 'animal-read/:id', component: AnimalComponent},
      {path: 'account', component: AccountComponent},
    ]
  }
];

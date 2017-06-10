import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { MaterialDetailComponent } from './material/detail/material-detail.component';
import { MaterialListComponent } from './material/list/material-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: 'materials', component: MaterialListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'materials/:id', component: MaterialDetailComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

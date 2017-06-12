import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { MaterialDetailComponent } from './material/detail/material-detail.component';
import { MaterialListComponent } from './material/list/material-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DigestListComponent } from "./digest/list/digest-list.component";
import {DigestDetailComponent} from "./digest/detail/digest-detail.component";

const appRoutes: Routes = [
    { path: 'materials', component: MaterialListComponent },
    { path: 'digests', component: DigestListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'materials/:id', component: MaterialDetailComponent },
    { path: 'digests/:id', component: DigestDetailComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

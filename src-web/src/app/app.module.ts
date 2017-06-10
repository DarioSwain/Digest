import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { MaterialRepository } from "./material/material.repository.service";

import { AppComponent } from './app.component';
import { MaterialDetailComponent } from './material/detail/material-detail.component';
import { MaterialListComponent } from './material/list/material-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Create the client as outlined above
const client = new ApolloClient();

export function provideClient(): ApolloClient {
    return client;
}


@NgModule({
  declarations: [
    AppComponent,
    MaterialDetailComponent,
    MaterialListComponent,
    NavigationComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [ MaterialRepository ],
  bootstrap: [AppComponent]
})
export class AppModule { }

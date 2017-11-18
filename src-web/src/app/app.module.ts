import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import {ApolloClient, createNetworkInterface} from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialDetailComponent } from './material/detail/material-detail.component';
import { MaterialListComponent } from './material/list/material-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CreateDigestModalComponent} from "./digest/list/create-digest-modal.component";
import {DigestListComponent} from "./digest/list/digest-list.component";
import {ModalComponent} from "./modal/modal.component";
import {DigestDetailComponent} from "./digest/detail/digest-detail.component";
import {DigestSectionsComponent} from "./digest/detail/digest-sections.component";
import {DigestSelectorComponent} from "./digest/selector/digest-selector.component";
import {AddToDigestComponent} from "./material/list/add-to-digest-modal.component";
import {AddMaterialModalComponent} from "./material/list/add-material-modal.component";

// Create the client as outlined above
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.apiPath
  }),
});

export function provideClient(): ApolloClient {
    return client;
}

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    MaterialDetailComponent,
    MaterialListComponent,
    AddMaterialModalComponent,
    DigestListComponent,
    CreateDigestModalComponent,
    DigestDetailComponent,
    DigestSectionsComponent,
    DigestSelectorComponent,
    AddToDigestComponent,
    NavigationComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ApolloModule.forRoot(provideClient)
  ],
  entryComponents: [DigestSelectorComponent, CreateDigestModalComponent, AddMaterialModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

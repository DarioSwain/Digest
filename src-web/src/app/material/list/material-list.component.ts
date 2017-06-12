import {Component, OnInit, OnDestroy} from '@angular/core';
import { Material } from '../material';
import { Router } from "@angular/router";

import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subscription} from "rxjs";

const MaterialList = gql`
  query MaterialList {
    materialList { 
      id, 
      url, 
      title, 
      description
    }
  }
`;

@Component({
    selector: 'material-list',
    templateUrl: './material-list.component.html',
})
export class MaterialListComponent implements OnInit, OnDestroy {
    private materialsObs: ApolloQueryObservable<any>;
    private materialSub: Subscription;

    public materials: any;

    constructor(private apollo: Apollo, private router: Router) {}

    ngOnInit() {
        this.materialsObs = this.apollo.watchQuery({ query: MaterialList });
        this.materialSub = this.materialsObs.subscribe(({ data, loading}) => {
            this.materials = data.materialList;
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    goToEdit(material: Material): void {
        this.router.navigate(['/materials', material.id]);
    }

    public ngOnDestroy(): void {
        this.materialSub.unsubscribe();
    }
}

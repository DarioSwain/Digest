import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subject, Subscription} from "rxjs";
import { Material } from "../material";

const MaterialQuery = gql`
  query Material($id: String!) {
    material(id: $id) {
      id, 
      url, 
      title, 
      description
    }
  }
`;

const UpdateMaterialMutation = gql`
  mutation UpdateMaterial ($id: String!, $url: String!, $title: String, $description: String) {
    updateMaterial(id: $id, url: $url, title: $title, description: $description) { 
      id, 
      url, 
      title, 
      description
    }
}
`;

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
})
export class MaterialDetailComponent implements OnInit {
    public material: Material = null;
    private id: Subject<string> = new Subject<string>();

    private materialsObs: ApolloQueryObservable<any>;
    private materialSub: Subscription;

    constructor(
        private apollo: Apollo,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.materialsObs = this.apollo.watchQuery({
            query: MaterialQuery,
            variables: {
                id: this.id
            }
        });
        this.materialSub = this.materialsObs.subscribe(({ data, loading}) => {
            this.material = new Material(data.material.id, data.material.url, data.material.title, data.material.description);
        }, (error) => {
            console.log('there was an error sending the query', error);
        });

        this.route.params.subscribe((params) => {
            this.id.next(params['id']);
        });
    }

    goBack(): void {
        this.location.back();
    }

    updateMaterial(material: Material): void {
        this.apollo.mutate({
            mutation: UpdateMaterialMutation,
            variables: {
                id: material.id,
                url: material.url,
                title: material.title,
                description: material.description
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateMaterial: {
                    __typename: 'Material',
                    id: material.id,
                    url: material.url,
                    title: material.title,
                    description: material.description,
                },
            },
        }).subscribe(({ data }) => {
            this.goBack();
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
}

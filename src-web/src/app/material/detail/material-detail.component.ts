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
      proposedBy,
      title,
      description,
      language,
      tags
    }
  }
`;

const UpdateMaterialMutation = gql`
  mutation UpdateMaterial ($id: String!, $url: String!, $proposedBy: String, $title: String, $description: String, $language: String, $tags: [String]) {
    updateMaterial(id: $id, url: $url, title: $title, description: $description, proposedBy: $proposedBy, language: $language, tags: $tags) { 
      id, 
      url, 
      proposedBy,
      title, 
      description,
      language,
      tags
    }
}
`;

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
})
export class MaterialDetailComponent implements OnInit {
    public material: Material = null;
    //TODO: Move duplicates to separate components
    public supportedLanguages = [
        'EN',
        'RU'
    ];

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
            console.log(data);
            this.material = new Material(
                data.material.id,
                data.material.url,
                data.material.title,
                data.material.description,
                data.material.proposedBy,
                data.material.language,
                data.material.tags.join(', ')
            );
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
                proposedBy: material.proposedBy,
                title: material.title,
                description: material.description,
                language: material.language,
                tags: material.tags.split(',').map(item => item.trim())
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateMaterial: {
                    __typename: 'Material',
                    id: material.id,
                    url: material.url,
                    proposedBy: material.proposedBy,
                    title: material.title,
                    description: material.description,
                    language: material.language,
                    tags: material.tags.split(',').map(item => item.trim())
                },
            },
        }).subscribe(({ data }) => {
            this.goBack();
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subject, Subscription} from "rxjs";
import {Digest} from "../digest";

const DigestQuery = gql`
  query Digest($id: String!) {
    digest(id: $id) {
      id, 
      name,
      state,
      sections {
        name,
        materials {
          id,
          url,
          title,
          description
        }
      }
    }
  }
`;

const RenameDigestMutation = gql`
  mutation RenameDigest ($id: String!, $name: String!) {
    renameDigest(id: $id, name: $name) { 
      id, 
      name, 
      state
    }
}
`;

@Component({
    selector: 'digest-detail',
    templateUrl: './digest-detail.component.html',
})
export class DigestDetailComponent implements OnInit {
    public digest: Digest = null;
    private id: Subject<string> = new Subject<string>();

    private digestObs: ApolloQueryObservable<any>;
    private digestSub: Subscription;

    constructor(
        private apollo: Apollo,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.digestObs = this.apollo.watchQuery({
            query: DigestQuery,
            variables: {
                id: this.id
            }
        });
        this.digestSub = this.digestObs.subscribe(({ data, loading}) => {
            this.digest = new Digest(data.digest.id, data.digest.name, data.digest.state, data.digest.sections);
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

    renameDigest(digest: Digest): void {
        this.apollo.mutate({
            mutation: RenameDigestMutation,
            variables: {
                id: digest.id,
                name: digest.name,
            },
            optimisticResponse: {
                __typename: 'Mutation',
                updateMaterial: {
                    __typename: 'Digest',
                    id: digest.id,
                    name: digest.name,
                    state: digest.state,
                },
            },
        }).subscribe(({ data }) => {
            console.log(data);
            // this.goBack();
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
}

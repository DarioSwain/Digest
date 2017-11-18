import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Digest } from '../digest';
import { Router } from "@angular/router";

import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subscription} from "rxjs";
import {ModalComponent} from "../../modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateDigestModalComponent} from "./create-digest-modal.component";

const DigestList = gql`
  query DigestList {
    digestList { 
      id, 
      name,
      state,
      sections {
     	name
      }
    }
  }
`;

@Component({
    selector: 'digest-list',
    templateUrl: './digest-list.component.html',
})
export class DigestListComponent implements OnInit, OnDestroy {
    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    private digestObs: ApolloQueryObservable<any>;
    private digestSub: Subscription;

    public digests: any;

    constructor(private apollo: Apollo, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.digestObs = this.apollo.watchQuery({ query: DigestList });
        this.digestSub = this.digestObs.subscribe(({ data, loading}) => {
            console.log(data);
            this.digests = data.digestList;
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    goToEdit(digest: Digest): void {
        this.router.navigate(['/digests', digest.id]);
    }

    public ngOnDestroy(): void {
        this.digestSub.unsubscribe();
    }

    openCreateModal() {
        this.modalService.open(CreateDigestModalComponent);
    }
}

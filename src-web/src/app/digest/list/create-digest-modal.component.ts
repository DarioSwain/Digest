import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const CreateDigest = gql`
  mutation CreateDigest($name: String!) {
    createDigest(name: $name) {
      id,
      name
    }
  }
`;

@Component({
    selector: 'create-digest-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Create new digest.</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div *ngIf="componentError" class="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> {{ componentError }}
      </div>
      <div class="form-group">
        <label for="digest-name">Name:</label>
        <input class="form-control" id="digest-name" [(ngModel)]="digestName" (ngModelChange)="flushError()" />
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="createDigest()">Create</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class CreateDigestModalComponent implements OnInit {
    digestName: String;

    public componentError: string = null;

    constructor(private apollo: Apollo, public activeModal: NgbActiveModal) {}

    ngOnInit() {
    }

    createDigest() {
        if ('' === this.digestName) {
            this.componentError = "Please enter digest name.";

            return;
        }

        this.apollo.mutate({
            mutation: CreateDigest,
            variables: {
                name: this.digestName,
            }
        }).subscribe(({ data }) => {
            console.log(data);
            //TODO: Success message.
            //TODO: Notify digest list to reload data.
            this.activeModal.close('Digest was successfully created.');
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    flushError() {
        this.componentError = null;
    }
}

import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Material} from "../material";

const AddMaterial = gql`
  mutation AddMaterial($url: String!, $title: String, $description: String) {
    addMaterial(url: $url, title: $title, description: $description){
        id
    }
  }
`;

@Component({
    selector: 'add-material-modal',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Add new material.</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div *ngIf="componentError" class="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> {{ componentError }}
      </div>
      <div class="form-group">
        <label for="url">URL:</label>
        <input class="form-control" id="url" [(ngModel)]="material.url" (ngModelChange)="flushError()" />
          <label for="title">Title:</label>
          <input class="form-control" id="title" [(ngModel)]="material.title" (ngModelChange)="flushError()" />
          <label for="description">Description:</label>
          <textarea class="form-control" id="description" [(ngModel)]="material.description" (ngModelChange)="flushError()" ></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="addMaterial()">Add</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AddMaterialModalComponent implements OnInit {
    material: Material = <Material>{};

    public componentError: string = null;

    constructor(private apollo: Apollo, public activeModal: NgbActiveModal) {}

    ngOnInit() {
    }

    addMaterial() {
        if ('' === this.material.url) {
            this.componentError = "Please enter material url.";

            return;
        }

        this.apollo.mutate({
            mutation: AddMaterial,
            variables: {
                url: this.material.url,
                title: this.material.title,
                description: this.material.description,
            }
        }).subscribe(({ data }) => {
            console.log(data);
            //TODO: Success message.
            //TODO: Notify material list to reload data.
            this.activeModal.close('Material was successfully added.');
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    flushError() {
        this.componentError = null;
    }
}

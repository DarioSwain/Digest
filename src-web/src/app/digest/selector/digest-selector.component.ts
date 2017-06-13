import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {Digest, Section} from '../digest';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subscription} from "rxjs";
import {Material} from "../../material/material";

const DigestList = gql`
  query DigestList {
    digestList { 
      id, 
      name,
      sections {
     	name
      }
    }
  }
`;

const AddMaterialToDigestMutation = gql`
  mutation AddMaterialToDigest($digestId: String!, $sectionName: String!, $materialId: String!) {
    addMaterialToDigest(digestId: $digestId, section: $sectionName, materialId: $materialId) { 
      id,
      name,
      state
    }
}
`;


export class SelectedResult {
    public readonly digest: Digest;
    public readonly section: Section;

    public constructor(digest: Digest, section: Section) {
        this.digest = digest;
        this.section = section;
    }
}

@Component({
    selector: 'digest-selector',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Choose digest and section...</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div *ngIf="componentError" class="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> {{ componentError }}
      </div>
      <div class="form-group">
        <label for="digest-selector">Select digest:</label>
        <select class="form-control" id="digest-selector" [(ngModel)]="selectedDigest" (ngModelChange)="flushError($event)">
            <option *ngFor="let digest of digests" [ngValue]="digest">{{digest.name}}</option>
        </select>
        <div ngif="selectedDigest.sections">
            <label for="section-selector">Select section:</label>
            <select class="form-control" id="section-selector" [(ngModel)]="selectedSection" (ngModelChange)="flushError($event)">
                <option *ngFor="let section of selectedDigest.sections" [ngValue]="section">{{section.name}}</option>
            </select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="addMaterialToDigest()">Add</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class DigestSelectorComponent implements OnInit, OnDestroy {
    private defaultSection: Section = new Section("Choose section for further actions...");
    @Input() public selectedSection: Section = this.defaultSection;

    private defaultDigest: Digest = new Digest("default", "Choose digest for further actions...", "draft", [this.defaultSection]);
    @Input() public selectedDigest: Digest = this.defaultDigest;

    @Input() public material: Material;

    public digests: Digest[] = [this.selectedDigest];

    private digestObs: ApolloQueryObservable<any>;
    private digestSub: Subscription;

    private componentError: string = null;

    @Output() select = new EventEmitter<SelectedResult>();

    constructor(private apollo: Apollo, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.digestObs = this.apollo.watchQuery({ query: DigestList });
        this.digestSub = this.digestObs.subscribe(({ data, loading}) => {
            //TODO: Choose digest where material not exists.
            for (let digest of data.digestList) {
                let sections = [this.defaultSection];
                for (let section of digest.sections) {
                    sections.push(new Section(section.name));
                }

                this.digests.push(new Digest(digest.id, digest.name, 'draft', sections.length > 0 ? sections : null));
            }

            console.log(this.digests);
        }, (error) => {
            console.log('there was an error sending the query', error);
        });

        if (!this.selectedDigest) {
            this.selectedDigest = new Digest("default", "Choose digest for further actions...");
        }
    }

    addMaterialToDigest() {
        if (this.selectedDigest === this.defaultDigest) {
            this.componentError = "Please choose digest.";

            return;
        }

        if (this.selectedSection === this.defaultSection) {
            this.componentError = "Please choose section.";

            return;
        }

        if (!this.selectedDigest.sections.some(section => section === this.selectedSection)) {
            this.componentError = "Please choose section.";

            return;
        }

        if (!this.material) {
            this.componentError = "Nothing to add. Material not specified.";

            return;
        }

        this.apollo.mutate({
            mutation: AddMaterialToDigestMutation,
            variables: {
                digestId: this.selectedDigest.id,
                sectionName: this.selectedSection.name,
                materialId: this.material.id,
            }
        }).subscribe(({ data }) => {
            console.log(data);

            this.select.emit(new SelectedResult(this.selectedDigest, this.selectedSection));

            //TODO: Success message.
            this.activeModal.close('Successfully added.');
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }

    flushError() {
        this.componentError = null;
    }

    public ngOnDestroy(): void {
        this.digestSub.unsubscribe();
    }
}

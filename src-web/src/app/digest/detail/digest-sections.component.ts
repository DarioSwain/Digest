import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Router} from "@angular/router";
import {Material} from "../../material/material";

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Digest} from "../digest";
import {Location} from "@angular/common";

const RemoveMaterialFromDigestMutation = gql`
  mutation RemoveMaterialFromDigest($digestId: String!, $sectionName: String!, $materialId: String!) {
    removeMaterialFromDigest(digestId: $digestId, section: $sectionName, materialId: $materialId) { 
      id,
      name,
      state
    }
}
`;

@Component({
    selector: 'digest-sections',
    templateUrl: './digest-sections.component.html',
})
export class DigestSectionsComponent {
    @Input()
    public digest: Digest;

    constructor(private router: Router, private apollo: Apollo, private location: Location) {}

    goToEdit(material: Material): void {
        this.router.navigate(['/materials', material.id]);
    }

    removeMaterial(material: Material, sectionName: String): void {
        this.apollo.mutate({
            mutation: RemoveMaterialFromDigestMutation,
            variables: {
                digestId: this.digest.id,
                sectionName: sectionName,
                materialId: material.id,
            }
        }).subscribe(({ data }) => {
            //TODO: Doesn't work.
            // this.digest.sections.forEach(function (key, value) {
            //     if (value.name === sectionName) {
            //         value.materials = value.materials.filter(sectionMaterial => sectionMaterial !== material);
            //     }
            // });

            //TODO: Temporary solution. Should be changed after proper two-way binding.
            window.location.reload();
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
}

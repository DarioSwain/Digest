import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'digest-sections',
    templateUrl: './digest-sections.component.html',
})
export class DigestSectionsComponent {
    @Input()
    public sections: any = [];

    // renameDigest(digest: Digest): void {
    //     this.apollo.mutate({
    //         mutation: RenameDigestMutation,
    //         variables: {
    //             id: digest.id,
    //             name: digest.name,
    //         },
    //         optimisticResponse: {
    //             __typename: 'Mutation',
    //             updateMaterial: {
    //                 __typename: 'Digest',
    //                 id: digest.id,
    //                 name: digest.name,
    //                 state: digest.state,
    //             },
    //         },
    //     }).subscribe(({ data }) => {
    //         console.log(data);
    //         // this.goBack();
    //     }, (error) => {
    //         console.log('there was an error sending the query', error);
    //     });
    // }
}

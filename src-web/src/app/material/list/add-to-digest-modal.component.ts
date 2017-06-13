import {Component, Input} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DigestSelectorComponent} from "../../digest/selector/digest-selector.component";
import {Material} from "../material";

@Component({
    selector: 'add-to-digest',
    template: `
    <button class="btn btn-sm btn-outline-primary" (click)="open()">Add to digest.</button>
`
})
export class AddToDigestComponent {
    @Input() material: Material;

    constructor(private modalService: NgbModal) {}

    open() {
        const digestSelector = this.modalService.open(DigestSelectorComponent);
        digestSelector.componentInstance.material = this.material;
    }
}

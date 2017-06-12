import { Component, Input } from '@angular/core';
import { Material } from './material';

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
})

export class MaterialDetailComponent {
    @Input() material: Material;
}

import { Component, Input, OnInit } from '@angular/core';
import { Material } from '../material';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MaterialRepository } from "../material.repository.service";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'material-detail',
    templateUrl: './material-detail.component.html',
})

export class MaterialDetailComponent implements OnInit {
    @Input() material: Material;

    constructor(
        private materialRepository: MaterialRepository,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.materialRepository.getMaterial(params['id']))
            .subscribe(material => this.material = material);
    }

    goBack(): void {
        this.location.back();
    }
}

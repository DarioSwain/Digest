import { Component, OnInit } from '@angular/core';
import { Material } from '../material';
import { MaterialRepository } from "../material.repository.service";
import { Router } from "@angular/router";

@Component({
    selector: 'material-list',
    templateUrl: './material-list.component.html',
})

export class MaterialListComponent implements OnInit {
    materials: Material[];
    selectedMaterial: Material;

    constructor(
        private router: Router,
        private materialRepository: MaterialRepository
    ) { }

    getMaterials(): void {
        this.materialRepository.getMaterials().then(materials => this.materials = materials);
    }

    ngOnInit(): void {
        this.getMaterials();
    }

    onSelect(material: Material): void {
        this.selectedMaterial = material;
    }

    gotoDetail(): void {
        this.router.navigate(['/materials', this.selectedMaterial.id]);
    }
}

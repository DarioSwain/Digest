import { Component, OnInit } from '@angular/core';
import { Material } from './material/material';
import {MaterialRepository} from "./material/material.repository.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MaterialRepository],
})
export class AppComponent {
  title = 'Digest Browser';
  materials: Material[];
  selectedMaterial: Material;

  constructor(private materialRepository: MaterialRepository) { }

  getMaterials(): void {
    this.materialRepository.getMaterials().then(materials => this.materials = materials);
  }

  ngOnInit(): void {
    this.getMaterials();
  }

  onSelect(material: Material): void {
    this.selectedMaterial = material;
  }
}

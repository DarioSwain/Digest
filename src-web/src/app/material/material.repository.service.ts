import { Injectable } from '@angular/core';
import { Material } from "./material";

@Injectable()
export class MaterialRepository {
    getMaterials(): Promise<Material[]> {
        const materials: Material[] = [
            { id: '11', title: 'Mr. Nice', description: 'description', url: 'Mr. Nice' },
            { id: '12', title: 'Narco', description: 'description', url: 'Narco' },
            { id: '13', title: 'Bombasto', description: 'description', url: 'Bombasto' },
            { id: '14', title: 'Celeritas', description: 'description', url: 'Celeritas' },
            { id: '15', title: 'Magneta', description: 'description', url: 'Magneta' },
            { id: '16', title: 'RubberMan', description: 'description', url: 'RubberMan' }
        ];

        return Promise.resolve(materials);
    }

    getMaterial(id: string): Promise<Material> {
        return this.getMaterials()
            .then(materials => materials.find(material => material.id === id));
    }
}

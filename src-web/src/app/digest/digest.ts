export class Section {
    name: string;
    materials: any;

    constructor(name: string, materials: any = null) {
        this.name = name;
        this.materials = materials;
    }
}

export class Digest {
    id: string;
    name: string;
    state: string;
    sections: any;

    constructor(id: string, name: string, state: string = 'draft', sections: any = null) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.sections = sections;
    }
}

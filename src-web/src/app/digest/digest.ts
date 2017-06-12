export class Digest {
    id: string;
    name: string;
    state: string;
    sections: any;

    constructor(id: string, name: string, state: string, sections: any = null) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.sections = sections;
    }
}

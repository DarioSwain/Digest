export class Material {
    id: string;
    title: string;
    description: string;
    url: string;

    constructor(id: string, url: string, title: string, description: string) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
    }
}

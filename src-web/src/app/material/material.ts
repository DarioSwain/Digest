export class Material {
    id: string;
    title: string;
    description: string;
    url: string;
    proposedBy: string;
    language: string;
    tags: string;

    constructor(id: string, url: string, title: string, description: string, proposedBy: string, language: string, tags: string) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
        this.proposedBy = proposedBy;
        this.language = language;
        this.tags = tags;
    }
}

export enum Language
{
    Ka = 1,
    En = 2
}

export class Translation
{
    Language: Language;
    Value: string;

    constructor(language: Language, value: string) {
        this.Language = language;
        this.Value = value;
    }
}

export class SubTopic
{
    Id: number;
    NameTranslations: Translation[];
    Topic: Topic;

    constructor(id: number, nameTranslations: Translation[], topic: Topic) {
        this.Id = id;
        this.NameTranslations = nameTranslations;
        this.Topic = topic;
    }
}

export class Topic {
    Id: number;
    NameTranslations: Translation[];
    SubTopics: SubTopic[];

    constructor(id: number, nameTranslations: Translation[], subTopics: SubTopic[]) {
        this.Id = id;
        this.NameTranslations = nameTranslations;
        this.SubTopics = subTopics;
    }
}
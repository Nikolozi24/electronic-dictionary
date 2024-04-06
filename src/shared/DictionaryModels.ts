export class SubTopic
{
    Id: number;
    GeorgianName: string;
    EnglishName: string;
    Topic: Topic;

    constructor(id: number, georgianName: string, englishName: string, topic: Topic) {
        this.Id = id;
        this.GeorgianName = georgianName;
        this.EnglishName = englishName;
        this.Topic = topic;
    }
}

export class Topic {
    Id: number;
    GeorgianName: string;
    EnglishName: string;
    SubTopics: SubTopic[];

    constructor(id: number, georgianName: string, englishName: string, subTopics: SubTopic[]) {
        this.Id = id;
        this.GeorgianName = georgianName;
        this.EnglishName = englishName;
        this.SubTopics = subTopics;
    }
}
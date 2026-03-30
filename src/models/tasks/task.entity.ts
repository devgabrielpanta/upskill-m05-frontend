import { BaseEntity } from '@models/.base';

export class Task extends BaseEntity {
    constructor(
        id: number,
        public title: string,
        public category: string,
        public completed: boolean,
        public userId: number,
        public completedAt: Date | null = null,
        public tags: string[] = []
    ) {
        super(id);
    }

    static fromJson(data: any): Task {
        const parsedTags = Array.isArray(data.tags)
            ? data.tags
            : (typeof data.tags === 'string' ? data.tags.split(',') : []);

        const parsedCompletedAt = data.completedAt
            ? new Date(data.completedAt)
            : null;

        return new Task(
            Number(data.id),
            data.title,
            data.category,
            Boolean(data.completed),
            Number(data.user_id),
            parsedCompletedAt,
            parsedTags
        );
    }
}
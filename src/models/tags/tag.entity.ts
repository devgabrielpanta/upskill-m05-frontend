import { BaseEntity } from '@models/.base';

export class Tag extends BaseEntity {
    constructor(
        id: number,
        public title: string,
        public color: string
    ) {
        super(id);
    }

    static fromJson(data: any): Tag {
        return new Tag(
            Number(data.id),
            data.title,
            data.color
        );
    }
}
import { BaseStore } from '@models/.base';
import { Tag } from './tag.entity';

export class TagStore extends BaseStore<Tag> {
    getByTitle(title: string): Tag | undefined {
        return this.getAll().find(tag => tag.title.toLowerCase() === title.toLowerCase());
    }
}

export const tagStore = new TagStore();
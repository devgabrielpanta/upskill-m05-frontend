import { BaseEntity } from '@models/.base';

export class User extends BaseEntity {
    constructor(
        id: number,
        public name: string,
        public email: string,
        public active: boolean
    ) {
        super(id);
    }
    static fromJson(data: any): User {
        return new User(
            Number(data.id),
            data.name,
            data.email,
            Boolean(data.active)
        );
    }
}
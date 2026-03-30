import { BaseStore } from '@models/.base';
import { User } from './user.entity';

export class UserStore extends BaseStore<User> {
    getActiveUsers(): User[] {
        return this.getAll().filter(user => user.active);
    }
    getByEmail(email: string): User | undefined {
        return this.getAll().find(user => user.email === email);
    }
}

export const userStore = new UserStore();
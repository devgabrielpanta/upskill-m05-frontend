import { BaseStore } from '@models/.base';
import { Task } from './task.entity';

export class TaskStore extends BaseStore<Task> {

    getPendingTasks(): Task[] {
        return this.getAll().filter(task => !task.completed);
    }

    getCompletedTasks(): Task[] {
        return this.getAll().filter(task => task.completed);
    }

    getTasksByUser(userId: number): Task[] {
        return this.getAll().filter(task => task.userId === userId);
    }
}

export const taskStore = new TaskStore();
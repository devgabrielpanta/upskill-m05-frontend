import { BaseEntity } from './base.entity';

export abstract class BaseStore<T extends BaseEntity> {
    protected items: Map<number, T> = new Map();

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    countItems(): number {
        return this.items.size;
    }

    getById(id: number): T | undefined {
        return this.items.get(id);
    }

    setAll(items: T[]): void {
        this.items.clear();
        items.forEach(item => this.items.set(item.id, item));
    }

    add(item: T): void {
        this.items.set(item.id, item);
    }

    update(id: number, updatedData: Partial<T>): void {
        const existingItem = this.items.get(id);
        if (existingItem) {
            existingItem.updateLocal(updatedData);
        } else {
            this.items.set(id, updatedData as T);
        }
    }

    delete(id: number): void {
        this.items.delete(id);
    }
}
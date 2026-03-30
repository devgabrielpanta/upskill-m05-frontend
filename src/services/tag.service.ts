import api from '@api';
import { Tag, tagStore } from '@models/tags';
import { dispatchFeedback } from '../main';

export class TagService {
    static async loadTags(): Promise<Tag[]> {
        try {
            const data = await api.get<{ tags: any[] }>('/tags');
            const tags = data.tags.map(Tag.fromJson);
            tagStore.setAll(tags);
            dispatchFeedback("Tags carregadas com sucesso!", true);
            return tags;
        } catch {
            dispatchFeedback("Falha ao carregar tags!", false);
            return [];
        }
    }

    static async createTag(title: string, color: string): Promise<Tag | null> {
        if (!title.trim() || !color.trim()) {
            dispatchFeedback("Título e cor são obrigatórios!", false);
            return null;
        }

        try {
            const data = await api.post<any>('/tags', { title, color });
            const tagData = data.tag || data;

            const newTag = Tag.fromJson(tagData);
            tagStore.add(newTag);
            dispatchFeedback("Tag criada com sucesso!", true);
            return newTag;
        } catch {
            dispatchFeedback("Falha ao criar tag!", false);
            return null;
        }
    }

    static async updateTag(tagId: number, title: string, color: string): Promise<Tag | null> {
        if (!title.trim() || !color.trim()) {
            dispatchFeedback("Título e cor são obrigatórios!", false);
            return null;
        }

        try {
            const data = await api.put<any>(`/tags/${tagId}`, { title, color });
            const tagData = data.tag || data;
            
            const updatedTag = Tag.fromJson(tagData);
            tagStore.update(tagId, updatedTag);
            dispatchFeedback("Tag atualizada com sucesso!", true);
            return updatedTag;
        } catch {
            dispatchFeedback("Falha ao atualizar tag!", false);
            return null;
        }
    }

    static async deleteTag(tagId: number): Promise<boolean> {
        try {
            await api.delete(`/tags/${tagId}`);
            tagStore.delete(tagId);
            dispatchFeedback("Tag excluída com sucesso!", true);
            return true;
        } catch {
            dispatchFeedback("Falha ao excluir tag!", false);
            return false;
        }
    }
}
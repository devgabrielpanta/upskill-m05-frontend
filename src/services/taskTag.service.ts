import api from '@api';

export class TaskTagService {

    // GET /tags/:tagId/tasks
    static async getTasksByTag(tagId: number): Promise<any | null> {
        try {
            const data = await api.get<any>(`/tags/${tagId}/tasks`);
            return data;
        } catch (error: any) {
            console.error("Erro ao carregar tarefas da tag:", error);
            return null;
        }
    }

    // GET /tasks/:taskId/tags
    static async getTagsByTask(taskId: number): Promise<any | null> {
        try {
            const data = await api.get<any>(`/tasks/${taskId}/tags`);
            return data;
        } catch (error: any) {
            console.error("Erro ao carregar tags da tarefa:", error);
            return null;
        }
    }

    // POST /tasks/:taskId/tags/:tagId
    static async assignTagToTask(taskId: number, tagId: number): Promise<any | null> {
        try {
            const data = await api.post<any>(`/tasks/${taskId}/tags/${tagId}`, {});
            return data;
        } catch (error: any) {
            console.error("Erro ao vincular tag à tarefa:", error);
            return null;
        }
    }

    // DELETE /tasks/:taskId/tags/:tagId
    static async removeTagFromTask(taskId: number, tagId: number): Promise<boolean> {
        try {
            await api.delete(`/tasks/${taskId}/tags/${tagId}`);
            return true;
        } catch (error: any) {
            console.error("Erro ao desvincular tag da tarefa:", error);
            return false;
        }
    }
}
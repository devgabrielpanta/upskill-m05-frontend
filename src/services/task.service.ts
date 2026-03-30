import api from '@api';
import { Task, taskStore } from '@models/tasks';
import { dispatchFeedback } from '../main';

export class TaskService {

    static async loadTasks(filters?: { search?: string, sort?: string, done?: boolean }): Promise<Task[]> {
        try {
            const query = filters ? new URLSearchParams(filters as any).toString() : '';
            const endpoint = query ? `/tasks?${query}` : '/tasks';

            const data = await api.get<{ tasks: any[] }>(endpoint);
            const tasks = data.tasks.map(Task.fromJson);

            dispatchFeedback("Tarefas carregadas com sucesso!", true);
            taskStore.setAll(tasks);
            return tasks;

        } catch {
            dispatchFeedback("Falha ao carregar tarefas!", false);
            return [];
        }
    }

    static async createTask(title: string, category: string, userId: number): Promise<Task | null> {
        if (!title.trim() || !category.trim()) {
            dispatchFeedback("Título e categoria são obrigatórios!", false);
            return null;
        }

        try {
            const data = await api.post<{ task: any }>('/tasks', { title, category, userId });
            const newTask = Task.fromJson(data.task);

            taskStore.add(newTask);
            dispatchFeedback("Tarefa criada com sucesso!", true);
            return newTask;

        } catch {
            dispatchFeedback("Falha ao criar tarefa!", false);
            return null;
        }
    }

    static async toggleTaskCompletion(taskId: number, newStatus: boolean): Promise<boolean> {
        try {
            const data = await api.patch<{ task: any }>(`/tasks/${taskId}/complete`, { completed: newStatus });

            const updatedTask = Task.fromJson(data.task);
            taskStore.update(taskId, updatedTask);
            dispatchFeedback("Tarefa atualizada com sucesso!", true);
            return true;

        } catch {
            dispatchFeedback("Falha ao atualizar tarefa!", false);
            return false;
        }
    }

    static async updateTask(taskId: number, title: string, category: string): Promise<Task | null> {
        if (!title.trim() || !category.trim()) {
            dispatchFeedback("Título e categoria são obrigatórios!", false);
            return null;
        }

        try {
            const data = await api.put<any>(`/tasks/${taskId}`, { title, category });
            const taskData = data.task || data;
            const updatedTask = Task.fromJson(taskData);

            taskStore.update(taskId, updatedTask);
            dispatchFeedback("Tarefa atualizada com sucesso!", true);
            return updatedTask;

        } catch {
            dispatchFeedback("Falha ao atualizar tarefa!", false);
            return null;
        }
    }

    static async deleteTask(taskId: number): Promise<boolean> {
        try {
            await api.delete(`/tasks/${taskId}`);

            taskStore.delete(taskId);
            dispatchFeedback("Tarefa excluída com sucesso!", true);
            return true;

        } catch {
            dispatchFeedback("Falha ao excluir tarefa!", false);
            return false;
        }
    }
}
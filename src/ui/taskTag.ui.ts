import { TaskTagService } from '@services/taskTag.service';
import { EndpointController } from './EndpointController';
import { htmlMapping } from './htmlMapping';

export const getTasksByTagController = new EndpointController(htmlMapping['get-tasks-by-tag'], async (payload) => {
    if (!payload.tagId) return { message: "Tag ID obrigatório" };

    const response = await TaskTagService.getTasksByTag(Number(payload.tagId));
    if (!response) return { message: "Erro ao buscar tarefas vinculadas." };

    return response;
});

export const getTagsByTaskController = new EndpointController(htmlMapping['get-tags-by-task'], async (payload) => {
    if (!payload.taskId) return { message: "Task ID obrigatório" };

    const response = await TaskTagService.getTagsByTask(Number(payload.taskId));
    if (!response) return { message: "Erro ao buscar tags vinculadas." };

    return response;
});

export const postTaskTagController = new EndpointController(htmlMapping['post-tasktag'], async (payload) => {
    if (!payload.taskId || !payload.tagId) return { message: "Task ID e Tag ID são obrigatórios." };

    const response = await TaskTagService.assignTagToTask(Number(payload.taskId), Number(payload.tagId));
    if (!response) return { message: "Erro ao vincular tag à tarefa." };

    return { message: "Tag vinculada à tarefa com sucesso", response };
});

export const deleteTaskTagController = new EndpointController(htmlMapping['delete-tasktag'], async (payload) => {
    if (!payload.taskId || !payload.tagId) return { message: "Task ID e Tag ID são obrigatórios." };

    const success = await TaskTagService.removeTagFromTask(Number(payload.taskId), Number(payload.tagId));
    if (!success) return { message: "Erro ao desvincular tag da tarefa." };

    return { message: "Tag desvinculada com sucesso" };
});
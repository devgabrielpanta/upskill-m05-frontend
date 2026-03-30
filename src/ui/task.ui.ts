import { TaskService } from '@services/task.service';
import { EndpointController } from './EndpointController';
import { htmlMapping } from './htmlMapping';
import { taskStore } from '@models/tasks';

const updateTaskStats = () => {
    const statEl = document.getElementById('stat-total-tasks');
    if (statEl) {
        statEl.textContent = taskStore.countItems().toString();
    }
};

export const getTasksController = new EndpointController(htmlMapping['get-tasks'], async (payload) => {
    const filters = payload.search ? { search: payload.search } : undefined;
    const tasks = await TaskService.loadTasks(filters);
    updateTaskStats();
    return { total: tasks.length, tasks };
});

export const postTasksController = new EndpointController(htmlMapping['post-tasks'], async (payload) => {
    const task = await TaskService.createTask(payload.title, payload.category, Number(payload.userId));
    if (!task) return { message: "Erro ao criar tarefa", task: null };
    updateTaskStats();
    return { message: "Tarefa criada com sucesso", task };
});

export const putTasksController = new EndpointController(htmlMapping['put-tasks'], async (payload) => {
    const taskId = Number(payload.id);
    if (!taskId) {
        return { message: "ID da tarefa inválido ou não fornecido." };
    }

    if (!payload.title || !payload.category) {
        return { message: "Título e categoria são obrigatórios." };
    }

    const updatedTask = await TaskService.updateTask(taskId, payload.title, payload.category);
    if (!updatedTask) {
        return { message: "Erro ao atualizar a tarefa", task: null };
    }

    return { message: "Tarefa atualizada com sucesso", task: updatedTask };
});

export const patchTasksController = new EndpointController(htmlMapping['patch-tasks'], async (payload) => {
    if (!payload.id) return { message: "Task ID obrigatório" };
    const isCompleted = payload.completed === 'true';

    const success = await TaskService.toggleTaskCompletion(Number(payload.id), isCompleted);
    if (!success) return { message: "Falha ao atualizar status." };

    return { message: "Status da tarefa atualizado", completed: isCompleted };
});

export const deleteTasksController = new EndpointController(htmlMapping['delete-tasks'], async (payload) => {
    if (!payload.id) return { message: "Task ID obrigatório" };
    const success = await TaskService.deleteTask(Number(payload.id));
    if (!success) return { message: "Falha ao apagar tarefa." };
    updateTaskStats();
    return { message: "Tarefa apagada com sucesso", deletedId: payload.id };
});
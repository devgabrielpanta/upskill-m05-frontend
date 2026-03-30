import type { EndpointConfig } from './EndpointController';

export const htmlMapping: Record<string, EndpointConfig> = {
    // ==========================================
    // USERS
    // ==========================================
    'get-users': {
        method: 'GET',
        btnId: 'btn-get-users',
        resId: 'res-get-users',
        dotId: 'status-dot-get-users',
        textId: 'status-text-get-users',
    },
    'post-users': {
        method: 'POST',
        btnId: 'btn-post-users',
        resId: 'res-post-users',
        dotId: 'status-dot-post-users',
        textId: 'status-text-post-users',
        inputIds: {
            name: 'input-post-user-name',
            email: 'input-post-user-email'
        }
    },
    'put-users': {
        method: 'PUT',
        btnId: 'btn-put-users',
        resId: 'res-put-users',
        dotId: 'status-dot-put-users',
        textId: 'status-text-put-users',
        inputIds: {
            id: 'input-put-user-id',
            name: 'input-put-user-name',
            email: 'input-put-user-email',
            active: 'input-put-user-active'
        }
    },
    'patch-users': {
        method: 'PATCH',
        btnId: 'btn-patch-users',
        resId: 'res-patch-users',
        dotId: 'status-dot-patch-users',
        textId: 'status-text-patch-users',
        inputIds: {
            id: 'input-patch-user-id',
            active: 'input-patch-user-active'
        }
    },
    'delete-users': {
        method: 'DELETE',
        btnId: 'btn-delete-users',
        resId: 'res-delete-users',
        dotId: 'status-dot-delete-users',
        textId: 'status-text-delete-users',
        inputIds: {
            id: 'input-delete-user-id'
        }
    },

    // ==========================================
    // TASKS
    // ==========================================
    'get-tasks': {
        method: 'GET',
        btnId: 'btn-get-tasks',
        resId: 'res-get-tasks',
        dotId: 'status-dot-get-tasks',
        textId: 'status-text-get-tasks',
        inputIds: {
            search: 'input-get-task-search'
        }
    },
    'post-tasks': {
        method: 'POST',
        btnId: 'btn-post-tasks',
        resId: 'res-post-tasks',
        dotId: 'status-dot-post-tasks',
        textId: 'status-text-post-tasks',
        inputIds: {
            title: 'input-post-task-title',
            category: 'input-post-task-category',
            userId: 'input-post-task-user'
        }
    },
    'put-tasks': {
        method: 'PUT',
        btnId: 'btn-put-tasks',
        resId: 'res-put-tasks',
        dotId: 'status-dot-put-tasks',
        textId: 'status-text-put-tasks',
        inputIds: {
            id: 'input-put-task-id',
            title: 'input-put-task-title',
            category: 'input-put-task-category'
        }
    },
    'patch-tasks': {
        method: 'PATCH',
        btnId: 'btn-patch-tasks',
        resId: 'res-patch-tasks',
        dotId: 'status-dot-patch-tasks',
        textId: 'status-text-patch-tasks',
        inputIds: {
            id: 'input-patch-task-id',
            completed: 'input-patch-task-completed'
        }
    },
    'delete-tasks': {
        method: 'DELETE',
        btnId: 'btn-delete-tasks',
        resId: 'res-delete-tasks',
        dotId: 'status-dot-delete-tasks',
        textId: 'status-text-delete-tasks',
        inputIds: {
            id: 'input-delete-task-id'
        }
    },

    // ==========================================
    // TAGS
    // ==========================================
    'get-tags': {
        method: 'GET',
        btnId: 'btn-get-tags',
        resId: 'res-get-tags',
        dotId: 'status-dot-get-tags',
        textId: 'status-text-get-tags'
    },
    'post-tags': {
        method: 'POST',
        btnId: 'btn-post-tags',
        resId: 'res-post-tags',
        dotId: 'status-dot-post-tags',
        textId: 'status-text-post-tags',
        inputIds: {
            title: 'input-post-tag-title',
            color: 'input-post-tag-color'
        }
    },
    'put-tags': {
        method: 'PUT',
        btnId: 'btn-put-tags',
        resId: 'res-put-tags',
        dotId: 'status-dot-put-tags',
        textId: 'status-text-put-tags',
        inputIds: {
            id: 'input-put-tag-id',
            title: 'input-put-tag-title',
            color: 'input-put-tag-color'
        }
    },
    'delete-tags': {
        method: 'DELETE',
        btnId: 'btn-delete-tags',
        resId: 'res-delete-tags',
        dotId: 'status-dot-delete-tags',
        textId: 'status-text-delete-tags',
        inputIds: {
            id: 'input-delete-tag-id'
        }
    },

    // ==========================================
    // TASK x TAGS (Relacionamentos)
    // ==========================================
    'get-tasks-by-tag': {
        method: 'GET',
        btnId: 'btn-get-tasks-by-tag',
        resId: 'res-get-tasks-by-tag',
        dotId: 'status-dot-get-tasks-by-tag',
        textId: 'status-text-get-tasks-by-tag',
        inputIds: {
            tagId: 'input-get-tasks-by-tag-id'
        }
    },
    'get-tags-by-task': {
        method: 'GET',
        btnId: 'btn-get-tags-by-task',
        resId: 'res-get-tags-by-task',
        dotId: 'status-dot-get-tags-by-task',
        textId: 'status-text-get-tags-by-task',
        inputIds: {
            taskId: 'input-get-tags-by-task-id'
        }
    },
    'post-tasktag': {
        method: 'POST',
        btnId: 'btn-post-tasktag',
        resId: 'res-post-tasktag',
        dotId: 'status-dot-post-tasktag',
        textId: 'status-text-post-tasktag',
        inputIds: {
            taskId: 'input-post-tasktag-task-id',
            tagId: 'input-post-tasktag-tag-id'
        }
    },
    'delete-tasktag': {
        method: 'DELETE',
        btnId: 'btn-delete-tasktag',
        resId: 'res-delete-tasktag',
        dotId: 'status-dot-delete-tasktag',
        textId: 'status-text-delete-tasktag',
        inputIds: {
            taskId: 'input-delete-tasktag-task-id',
            tagId: 'input-delete-tasktag-tag-id'
        }
    }
};
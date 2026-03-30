import { UserService } from '@services/user.service';
import { EndpointController } from './EndpointController';
import { htmlMapping } from './htmlMapping';
import { userStore } from '@models/users';

const updateUserStats = () => {
    const statEl = document.getElementById('stat-total-users');
    if (statEl) {
        statEl.textContent = userStore.countItems().toString();
    }
};

// GET /users
export const getUsersController = new EndpointController(htmlMapping['get-users'], async () => {
    const users = await UserService.loadUsers();

    updateUserStats();

    return { total: users.length, users };
});

// POST /users
export const postUsersController = new EndpointController(htmlMapping['post-users'], async (payload) => {
    const user = await UserService.createUser(payload.name, payload.email);
    if (!user) {
        return { message: "Erro ao criar utilizador", user: [] };
    }
    updateUserStats();
    return { message: "Utilizador criado com sucesso", user };
});

// PUT /users/:id
export const putUsersController = new EndpointController(htmlMapping['put-users'], async (payload) => {
    const userId = Number(payload.id);
    if (!userId) {
        return { message: "ID de utilizador inválido ou não fornecido." };
    }

    // Converter o valor do select (string) para booleano
    const isActive = payload.active === 'true';

    const updatedUser = await UserService.updateUser(userId, payload.name, payload.email, isActive);
    if (!updatedUser) {
        return { message: "Erro ao atualizar utilizador", user: null };
    }

    return { message: "Dados do utilizador atualizados com sucesso", user: updatedUser };
});

// PATCH /users/:id
export const patchUsersController = new EndpointController(htmlMapping['patch-users'], async (payload) => {
    const userId = Number(payload.id);
    if (!userId) {
        return { message: "ID de utilizador inválido ou não fornecido." };
    }

    const isDesiredActive = payload.active === 'true';
    const success = await UserService.toggleUserStatus(userId, isDesiredActive);

    if (!success) {
        return { message: "Erro ao alterar o status do utilizador." };
    }

    return {
        message: "Status do utilizador atualizado com sucesso",
        active: isDesiredActive
    };
});

// DELETE /users/:id
export const deleteUsersController = new EndpointController(htmlMapping['delete-users'], async (payload) => {
    const userId = Number(payload.id);
    if (!userId) {
        return { message: "ID de utilizador inválido ou não fornecido." };
    }

    const success = await UserService.deleteUser(userId);
    if (!success) {
        return { message: "Erro ao remover utilizador. Verifique se o ID existe." };
    }

    updateUserStats();

    return { message: "Utilizador apagado com sucesso", deletedId: userId };
});
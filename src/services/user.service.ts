import api from '@api';
import { User, userStore } from '@models/users';
import { dispatchFeedback } from '../main';

export class UserService {

    static async loadUsers(filters?: { search?: string, sort?: string }): Promise<User[]> {
        try {
            const query = filters ? new URLSearchParams(filters as any).toString() : '';
            const endpoint = query ? `/users?${query}` : '/users';

            const data = await api.get<{ users: any[] }>(endpoint);
            const users = data.users.map(User.fromJson);

            dispatchFeedback("Utilizadores carregados com sucesso!", true);
            userStore.setAll(users);
            return users;
        } catch {
            dispatchFeedback("Falha ao carregar utilizadores!", false);
            return [];
        }
    }

    static async loadUserStats(): Promise<{ totalUsers: number, activeUsers: number, activePercentage: number } | null> {
        try {
            const data = await api.get<{ stats: any }>('/users/stats');
            return data.stats;
        } catch (error) {
            console.error("Erro ao carregar estatísticas de utilizadores:", error);
            return null;
        }
    }

    static async createUser(name: string, email: string): Promise<User | null> {
        if (!name.trim() || !email.trim()) {
            dispatchFeedback("Nome e e-mail não podem estar vazios!", false);
            return null;
        }

        try {
            const data = await api.post<{ user: any }>('/users', { name, email });
            const newUser = User.fromJson(data.user);
            userStore.add(newUser);
            dispatchFeedback("Utilizador criado com sucesso!", true);
            return newUser;
        } catch {
            dispatchFeedback("Falha ao criar o utilizador!", false);
            return null;
        }
    }

    static async updateUser(userId: number, name: string, email: string, active: boolean): Promise<User | null> {
        if (!name.trim() || !email.trim()) {
            dispatchFeedback("Nome e e-mail não podem estar vazios!", false);
            return null;
        }

        try {
            const data = await api.put<{ user: any }>(`/users/${userId}`, { name, email, active });
            const updatedUser = User.fromJson(data.user);

            userStore.update(userId, updatedUser);
            dispatchFeedback("Utilizador atualizado com sucesso!", true);
            return updatedUser;
        } catch {
            dispatchFeedback(`Falha ao atualizar utilizador!`, false);
            return null;
        }
    }

    static async toggleUserStatus(userId: number, newStatus: boolean): Promise<boolean> {
        try {
            const data = await api.patch<{ user: any }>(`/users/${userId}`, { active: newStatus });

            const updatedUser = User.fromJson(data.user);
            userStore.update(userId, updatedUser);
            dispatchFeedback(`Utilizador ${newStatus ? 'ativado' : 'desativado'} com sucesso!`, true);
            return true;
        } catch {
            dispatchFeedback(`Falha ao alterar status do utilizador!`, false);
            return false;
        }
    }

    static async deleteUser(userId: number): Promise<boolean> {
        try {
            await api.delete(`/users/${userId}`);
            userStore.delete(userId);
            dispatchFeedback("Utilizador removido com sucesso!", true);
            return true;
        } catch {
            dispatchFeedback(`Falha ao excluir utilizador!`, false);
            return false;
        }
    }
}
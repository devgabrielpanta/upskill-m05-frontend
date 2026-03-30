interface RequestOptions extends RequestInit {
    body?: any;
}

class ApiClient {
    private baseUrl = 'http://localhost:3000';

    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const config: RequestInit = {
            ...options,
            headers,
        };

        if (options.body && typeof options.body !== 'string') {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`[API Client Error] ${options.method || 'GET'} ${endpoint}:`, error);
            throw error;
        }
    }

    get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    post<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'POST', body });
    }

    put<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'PUT', body });
    }

    patch<T>(endpoint: string, body: any, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
    }

    delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

const api = new ApiClient();
export default api;
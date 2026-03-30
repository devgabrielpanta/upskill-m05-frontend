import { BaseEndpointUI } from './BaseEndpointUI';

export type EndpointConfig = {
    resId: string;
    dotId: string;
    textId: string;
    btnId: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    inputIds?: Record<string, string>; // Ex: { name: 'input-user-name', email: 'input-user-email' }
};

export class EndpointController extends BaseEndpointUI {
    private btnEl: HTMLElement | null;
    private inputIds: Record<string, string>;
    private method: string;

    // O callback que será executado quando o botão for clicado (chamada ao Service)
    private actionCallback: (payload: Record<string, string>) => Promise<any>;

    constructor(config: EndpointConfig, actionCallback: (payload: Record<string, string>) => Promise<any>) {
        super(config);
        this.btnEl = document.getElementById(config.btnId);
        this.inputIds = config.inputIds || {};
        this.method = config.method;
        this.actionCallback = actionCallback;

        this.attachListener();
    }

    // Varre o DOM em busca dos inputs configurados e extrai os seus valores
    private extractPayload(): Record<string, string> {
        const payload: Record<string, string> = {};
        for (const [key, elementId] of Object.entries(this.inputIds)) {
            const el = document.getElementById(elementId) as HTMLInputElement | HTMLSelectElement;
            if (el) payload[key] = el.value;
        }
        return payload;
    }

    private attachListener(): void {
        if (!this.btnEl) return;

        this.btnEl.addEventListener('click', async () => {
            this.renderLoading();

            try {
                const payload = this.extractPayload();
                const response = await this.actionCallback(payload);

                // Se o service retornar null ou false devido a um erro de validação (ex: campos vazios)
                if (response === null || response === false) {
                    this.renderError(400, 'Bad Request', { error: 'Falha na validação local ou requisição abortada.' });
                    return;
                }

                this.renderSuccess(200, 'OK', response, this.method);
            } catch (error: any) {
                this.renderError(500, 'Internal Error', { message: error.message });
            }
        });
    }
}
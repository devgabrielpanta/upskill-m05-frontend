export abstract class BaseEndpointUI {
    protected resEl: HTMLElement | null;
    protected dotEl: HTMLElement | null;
    protected textEl: HTMLElement | null;

    constructor(config: { resId: string; dotId: string; textId: string }) {
        this.resEl = document.getElementById(config.resId);
        this.dotEl = document.getElementById(config.dotId);
        this.textEl = document.getElementById(config.textId);
    }

    protected renderLoading(): void {
        this.updateDOM('...', 'LOADING', { message: 'A processar requisição...' }, true, 'GET');
    }

    protected renderSuccess(status: number | string, statusText: string, data: any, method: string): void {
        this.updateDOM(status, statusText, data, true, method);
    }

    protected renderError(status: number | string, statusText: string, error: any): void {
        this.updateDOM(status, statusText, error, false, 'ERROR');
    }

    private updateDOM(status: number | string, statusText: string, data: any, isSuccess: boolean, method: string): void {
        if (this.resEl) {
            this.resEl.textContent = JSON.stringify(data, null, 2);
            this.resEl.className = `text-sm font-mono leading-relaxed ${!isSuccess ? 'text-red-400' : (method === 'GET' ? 'text-[#50E3C2]' : 'text-[#D4B1F5]')
                }`;
        }

        if (this.textEl) this.textEl.textContent = `${status} ${statusText}`;

        if (this.dotEl) {
            this.dotEl.className = `w-2.5 h-2.5 rounded-full ${isSuccess ? 'bg-[#50E3C2]' : 'bg-red-500'}`;
        }
    }
}
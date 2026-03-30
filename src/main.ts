import './ui/user.ui';
import './ui/tag.ui';
import './ui/task.ui';
import './ui/taskTag.ui';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Mini ClickUp API online!');

    // Configuração do listener global de feedback visual
    document.addEventListener('show-feedback', (e) => {
        const { message, isSuccess } = (e as CustomEvent).detail;
        showFeedback(message, isSuccess);
    });
});

let feedbackTimeout: ReturnType<typeof setTimeout> | null = null;

function showFeedback(message: string, isSuccess: boolean = true): void {
    const feedbackEl = document.getElementById('feedback-wrapper');
    const feedbackText = feedbackEl?.querySelector('p');

    if (feedbackEl && feedbackText) {
        feedbackEl.className = "fixed bottom-4 left-0 px-4 py-3 w-64 max-w-xs z-50 text-white bg-transparent";
        feedbackText.textContent = message;

        if (isSuccess) {
            feedbackText.className = "bg-green-500 px-3 py-2 rounded-lg shadow-lg";
        } else {
            feedbackText.className = "bg-red-500 px-3 py-2 rounded-lg shadow-lg";
        }

        if (feedbackTimeout) {
            clearTimeout(feedbackTimeout);
        }

        feedbackTimeout = setTimeout(() => {
            feedbackText.className = "";
            feedbackText.textContent = "";
        }, 5000);
    }
}

export function dispatchFeedback(message: string, isSuccess: boolean = true): void {
    document.dispatchEvent(new CustomEvent('show-feedback', { detail: { message, isSuccess } }));
}
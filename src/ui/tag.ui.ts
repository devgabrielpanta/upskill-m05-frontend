import { TagService } from '@services/tag.service';
import { EndpointController } from './EndpointController';
import { htmlMapping } from './htmlMapping';
import { tagStore } from '@models/tags';

const updateTagStats = () => {
    const statEl = document.getElementById('stat-total-tags');
    if (statEl) {
        statEl.textContent = tagStore.countItems().toString();
    }
};

export const getTagsController = new EndpointController(htmlMapping['get-tags'], async () => {
    const tags = await TagService.loadTags();
    updateTagStats();
    return { total: tags.length, tags };
});

export const postTagsController = new EndpointController(htmlMapping['post-tags'], async (payload) => {
    const tag = await TagService.createTag(payload.title, payload.color);
    if (!tag) return { message: "Erro ao criar tag", tag: null };
    updateTagStats();
    return { message: "Tag criada com sucesso", tag };
});

export const putTagsController = new EndpointController(htmlMapping['put-tags'], async (payload) => {
    const tagId = Number(payload.id);
    if (!tagId) {
        return { message: "ID da tag inválido ou não fornecido." };
    }

    if (!payload.title || !payload.color) {
        return { message: "Título e cor são obrigatórios." };
    }

    const updatedTag = await TagService.updateTag(tagId, payload.title, payload.color);
    if (!updatedTag) {
        return { message: "Erro ao atualizar a tag", tag: null };
    }

    return { message: "Tag atualizada com sucesso", tag: updatedTag };
});

export const deleteTagsController = new EndpointController(htmlMapping['delete-tags'], async (payload) => {
    if (!payload.id) return { message: "Tag ID obrigatório" };

    const success = await TagService.deleteTag(Number(payload.id));
    if (!success) return { message: "Falha ao apagar tag." };

    updateTagStats();
    return { message: "Tag apagada com sucesso", deletedId: payload.id };
});
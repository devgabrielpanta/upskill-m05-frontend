export abstract class BaseEntity {
    public id: number;

    constructor(id: number) {
        this.id = id;
    }

    // Atualiza as propriedades da entidade com os dados fornecidos
    updateLocal(updatedData: Partial<this>): void {
        Object.assign(this, updatedData);
    }
}
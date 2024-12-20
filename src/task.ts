export interface Task {
    id?: number;
    title?: string;
    description?: string;
    deadline?: Date;
    completed?: boolean;
    archived?: boolean;
    created?: Date;
    updated?: Date;
}

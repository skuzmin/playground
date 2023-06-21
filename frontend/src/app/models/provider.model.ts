export interface BaseProvider {
    id: string;
    name: string;
    url: string;
}

export interface CRUD {
    getList: Function;
    updateItem: Function;
    createItem: Function;
    deleteItem: Function;
}
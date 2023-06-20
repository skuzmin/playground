export interface BaseProvider {
    id: string;
    name: string;
    function?: CRUD;
}

export interface CRUD {
    getList: Function;
    updateItem: Function;
    createItem: Function;
    deleteItem: Function;
}
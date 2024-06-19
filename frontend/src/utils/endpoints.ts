const default_actions = {
    list: "list/",
    get: "get/",
    create: "create",
    update: "update/",
    delete: "delete/",
    search: "search/",
    paginate: "paginate/",
}

const event = {
    endpoint: 'event/',
    actions: {
        ...default_actions
    }
}

const registration = {
    endpoint: 'registration/',
    actions: {
        ...default_actions
    }
}

export const endpoints = { 
    event, 
    registration 
}
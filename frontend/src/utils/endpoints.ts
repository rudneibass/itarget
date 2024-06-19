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
    default_actions: default_actions,
    actions: {
        ...default_actions
    }
}

const registration = {
    endpoint: 'registration/',
    default_actions: default_actions,
    actions: {
        ...default_actions
    }
}

export const endpoints = { event, registration }
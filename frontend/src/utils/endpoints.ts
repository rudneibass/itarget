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

const formPath = 'form/'
const formActions = Object.fromEntries(
    Object.entries(default_actions).map(([key, value]) => [key, formPath + value])
)
const form = {
    path: 'form/',
    actions: {
        ...formActions,
        get_by_name: `${formPath}name/` 
    }
}


export const endpoints = { 
    event, 
    registration,
    form
}
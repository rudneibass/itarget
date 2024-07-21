const defaultActions = {
    list: "list/",
    get: "get/",
    create: "create/",
    update: "update/",
    delete: "delete/",
    search: "search/",
    paginate: "paginate/",
}


const eventPath = 'event/'
const eventActions = Object.fromEntries(Object.entries(defaultActions).map(([key, value]) => [key, eventPath + value]))
const event = {
    path: eventPath,
    actions: {
        ...eventActions, 
    }
}


const registrationPath = 'registration/'
const registrationActions = Object.fromEntries(Object.entries(defaultActions).map(([key, value]) => [key, registrationPath + value]))
const registration = {
    path: registrationPath,
    actions: {
        ...registrationActions, 
    }
}


const formPath = 'form/'
const formActions = Object.fromEntries(Object.entries(defaultActions).map(([key, value]) => [key, formPath + value]))
const form = {
    path: formPath,
    actions: {
        ...formActions,
        getByName: `${formPath}name/` 
    }
}


export const endpoints = { 
    defaultActions,
    event, 
    registration,
    form
}
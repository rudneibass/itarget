export type FormCacheType = {
    data: object
    pageIdentifier: string
}

export type ListCacheType = {
    data: []
    pageIdentifier: string
}

export type GlobalContextType = {
    formCache: FormCacheType[] | undefined,
	setFormCacheGlobalContext: ({ data, pageIdentifier }:{data: object, pageIdentifier: string}) => void,
    listCache: ListCacheType[] | undefined,
	setListCacheGlobalContext: ({ data, pageIdentifier }:{data: [], pageIdentifier: string}) => void,
}
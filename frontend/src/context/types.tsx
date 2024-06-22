export type CacheSearchType = {
    data: []
    pageIdentifier: string
}

export type GlobalContextType = {
	cacheSearch: CacheSearchType[] | undefined,
	setCacheSearchGlobalContext: ({ data, pageIdentifier }:{data: [], pageIdentifier: string}) => void,
}
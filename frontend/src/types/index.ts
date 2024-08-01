export type LaravelPaginationLinksType = {
    url: string | null;
    label: string;
    active: boolean;
}

export type LaravelPaginationType = {
    current_page: number;
    data: [];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LaravelPaginationLinksType[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export function isLaravelPaginationType(obj: unknown): obj is LaravelPaginationType {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    const paginationObj = obj as LaravelPaginationType;

    return (
        typeof paginationObj.current_page === 'number' &&
        Array.isArray(paginationObj.data) &&
        typeof paginationObj.first_page_url === 'string' &&
        typeof paginationObj.from === 'number' &&
        typeof paginationObj.last_page === 'number' &&
        typeof paginationObj.last_page_url === 'string' &&
        Array.isArray(paginationObj.links) &&
        paginationObj.links.every(link => 
            typeof link === 'object' &&
            (typeof link.url === 'string' || link.url === null) &&
            typeof link.label === 'string' &&
            typeof link.active === 'boolean'
        ) &&
        (typeof paginationObj.next_page_url === 'string' || paginationObj.next_page_url === null) &&
        typeof paginationObj.path === 'string' &&
        typeof paginationObj.per_page === 'number' &&
        (typeof paginationObj.prev_page_url === 'string' || paginationObj.prev_page_url === null) &&
        typeof paginationObj.to === 'number' &&
        typeof paginationObj.total === 'number'
    );
}

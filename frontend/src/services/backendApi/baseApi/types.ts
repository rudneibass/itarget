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



export type ResponseError = {
    code?: string,
    status?: number,
    message: string  | undefined,
    error_422_backend_api?: string
}

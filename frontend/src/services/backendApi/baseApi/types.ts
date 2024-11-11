export type ResponseError = {
    code?: string,
    status?: number,
    message: string  | undefined,
    error_422_backend_api?: string
}

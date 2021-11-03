export interface IHttpError {
    status: 'error';
    errors: Array<{ msg: string }>;
}

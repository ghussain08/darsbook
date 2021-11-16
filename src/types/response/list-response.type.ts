export interface IListResponse<T> {
    meta: IMeta;
    data: T[];
}

type IMeta = { nextCursor: number | null };

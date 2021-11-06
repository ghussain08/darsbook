import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../utils/request';
export interface ISeed {
    seedName: string;
    userId: string;
    isActive: boolean;
    createdOn: string;
    updatedOn: string;
    seedId: number;
}
export const seedsApi = createApi({
    reducerPath: 'seeds',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['SeedList'],
    endpoints: (builder) => {
        return {
            createSeed: builder.mutation<void, { seedName: string }>({
                query: (data) => {
                    return {
                        method: 'POST',
                        data: data,
                        url: `/api/private/v1/seeds`,
                    };
                },
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ['SeedList'];
                },
            }),
            removeSeed: builder.mutation<void, { id: number; status: 0 | 1 }>({
                query: (data) => {
                    return {
                        method: 'PUT',
                        data: data,
                        url: `/api/private/v1/seeds`,
                    };
                },
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ['SeedList'];
                },
            }),
            getUserSeeds: builder.query<{ seeds: Array<ISeed> }, void>({
                query: () => {
                    return { url: `/api/private/v1/seeds` };
                },
                providesTags: ['SeedList'],
            }),
        };
    },
});

export const { useGetUserSeedsQuery, reducer, reducerPath, useCreateSeedMutation, useRemoveSeedMutation } = seedsApi;

import coreQuery from "../../utils/core-rtk-query";
export interface ISeed {
    seedName: string;
    userId: string;
    isActive: boolean;
    createdOn: string;
    updatedOn: string;
    seedId: number;
}
export const seedsApi = coreQuery
    .injectEndpoints({
        endpoints: (builder) => {
            return {
                createSeed: builder.mutation<void, { seedName: string }>({
                    query: (data) => {
                        return {
                            method: "POST",
                            data: data,
                            url: `/api/private/v1/seeds`,
                        };
                    },
                }),
                removeSeed: builder.mutation<void, { id: number; status: 0 | 1 }>({
                    query: (data) => {
                        return {
                            method: "PUT",
                            data: data,
                            url: `/api/private/v1/seeds`,
                        };
                    },
                }),
                getUserSeeds: builder.query<{ seeds: Array<ISeed> }, void>({
                    query: () => {
                        return { url: `/api/private/v1/seeds` };
                    },
                }),
            };
        },
    })
    .enhanceEndpoints({
        addTagTypes: ["SeedList"],
        endpoints: {
            createSeed: {
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ["SeedList"];
                },
            },
            removeSeed: {
                invalidatesTags: (result, error, id) => {
                    return error ? [] : ["SeedList"];
                },
            },
            getUserSeeds: {
                providesTags: ["SeedList"],
            },
        },
    });

export const { useGetUserSeedsQuery, reducer, reducerPath, useCreateSeedMutation, useRemoveSeedMutation } = seedsApi;

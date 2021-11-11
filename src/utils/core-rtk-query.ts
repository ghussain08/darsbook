import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./request";
const coreQuery = createApi({
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
});
export default coreQuery;

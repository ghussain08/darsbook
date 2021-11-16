export const getURL = (
    url: string,
    payload?: {
        [key: string]: any;
    }
) => {
    if (payload) {
        // if value is null then remove it from the query string
        const query = Object.keys(payload)
            .filter((key) => payload[key] !== null)
            .map((key) => `${key}=${payload[key]}`)
            .join("&");
        return `${url}?${query}`;
    }
    return url;
};

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

export function getQueryParams() {
    const url = new URLSearchParams(window.location.search);
    const urlParams = Object.fromEntries(url.entries());
    const params: { [key: string]: string | null | undefined } = {};
    Object.keys(urlParams).forEach((key) => {
        params[key] = urlParams[key].trim();
        if (params[key] === "null") {
            params[key] = null;
        }
    });
    return params;
}

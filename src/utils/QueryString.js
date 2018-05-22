export default {
    serialize(params) {
        return Object
            .entries(params)
            .reduce((urlSearchParams, [key, value]) => {
                urlSearchParams.append(key, value);
                return urlSearchParams;
            }, new URLSearchParams())
            .toString();
    },
    parse(url) {
        const params = {};
        for (let [key, value] of url.searchParams.entries()) {
            params[key] = value;
        }
        return params;
    }
};

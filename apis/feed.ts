export const GetFeeds = async function (offset: number, query: string) {
    return use$Post('/home/get-feeds', JSON.stringify({
        "offset": offset,
        "query": query
    }));
}
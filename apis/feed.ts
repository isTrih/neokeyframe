export const GetFeeds = async function (offset: number, query: string) {
    return use$Post('/home/get-feeds', JSON.stringify({
        'offset': offset,
        'query': query
    }));
}
export const GetUserFeeds = async function (offset: number, userId: number, feedType: string) {
    return use$Post('/home/userfeeds', JSON.stringify({
        'offset': offset,
        'user_id': userId,
        'feed_type': feedType
    }));
}

export const GetFeeds = async (
	offset: number,
	query: string
) =>
	use$Post(
		'/home/get-feeds',
		JSON.stringify({
			offset: offset,
			query: query
		})
	)
export const GetUserFeeds = async (
	offset: number,
	userId: number,
	feedType: string
) =>
	use$Post(
		'/home/userfeeds',
		JSON.stringify({
			offset: offset,
			user_id: userId,
			feed_type: feedType
		})
	)

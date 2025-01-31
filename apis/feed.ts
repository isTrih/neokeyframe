export const GetFeeds = async (
	offset: number,
	query: string
) =>
	use$Post(
		'/home/getfeeds',
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


export const GetFeedDetail = async (id: number) =>
	use$Get(
		`/feed/${id}`
	)
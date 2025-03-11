/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

export const GetFeeds = async (
	offset: number,
	query: string
) => use$Get(`/home/getfeeds?os=${offset}&q=${query}`)
export const GetUserFeeds = async (
	offset: number,
	userId: number,
	feedType: number
) =>
	use$Get(
		`/home/userfeeds?uid=${userId}&os=${offset}&ftype=${feedType}`
	)

export const GetFeedDetail = async (id: number) =>
	use$Get(`/feed/${id}`)

export const ShareFeedXHS = async () => {
	return use$Get('/feed/share/xhs')
}

export type CoverInfo = {
	width: number
	height: number
}
export const NewFeed = async (
	title: string,
	content: string,
	raw_content: string,
	cover: string,
	cover_info: CoverInfo,
	media: string[]
) => {
	return use$Post(
		'/feed/new',
		JSON.stringify({
			title: title,
			content: content,
			raw_content: raw_content,
			cover: cover,
			cover_info:cover_info,
			media: media
		})
	)
}

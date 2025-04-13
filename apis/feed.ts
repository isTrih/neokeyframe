/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import type { https } from '~/types/http'
import type {
	FeedDetail,
	GetFeedListResponse
} from '~/types/keyframeGoComponents'

export const GetFeeds = async (
	offset: number,
	query: string
) => {
	const url = `/home/getfeeds?os=${offset}&q=${query}`
	if (query === '') {
		return use$Get(`/home/getfeeds?os=${offset}`)
	}
	return use$Get(url)
}
export const GetUserFeeds = async (
	offset: number,
	userId: number,
	feedType: number
) =>
	use$Get(
		`/home/userfeeds?uid=${userId}&os=${offset}&ftype=${feedType}`
	)

export type getFeedDetail = https & {
	data?: {
		Feed: FeedDetail
	}
}
export const GetFeedDetail = async (
	id: number
): Promise<getFeedDetail> => use$Get(`/feed/${id}`)

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
	media: string[],
	id: number
) => {
	return use$Post(
		'/feed/new',
		JSON.stringify({
			title: title,
			content: content,
			raw_content: raw_content,
			cover: cover,
			cover_info: cover_info,
			media: media,
			id: id
		})
	)
}

export const likeFeed = async (
	id: number
): Promise<
	https & {
		data?: {
			status: string
		}
	}
> => {
	return use$Post('/feed/like', {
		id: id
	})
}
export const collectFeed = async (
	id: number
): Promise<
	https & {
		data?: {
			status: string
		}
	}
> => {
	return use$Post('/feed/collect', {
		id: id
	})
}

export type getFeedListRes = https & {
	data?: GetFeedListResponse
}

export const getFeedList = async (
	offset: number
): Promise<getFeedListRes> =>
	use$Get(`/feed/feedlist/get?o=${offset}`)

export const deleteFeed = async (
	id: number
): Promise<
	https & {
		data?: {
			status: string
		}
	}
> =>
	use$Post('/feed/delete', {
		id: id
	})

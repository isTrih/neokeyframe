/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

export const GetFeeds = async (
	offset: number,
	query: string
) =>
	use$Get(
		`/home/getfeeds?os=${offset}&q=${query}`
	)
export const GetUserFeeds = async (
	offset: number,
	userId: number,
	feedType: number
) =>
	use$Get(`/home/userfeeds?uid=${userId}&os=${offset}&ftype=${feedType}`)

export const GetFeedDetail = async (id: number) =>
	use$Get(`/feed/${id}`)

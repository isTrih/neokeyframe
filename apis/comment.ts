import type { https } from '~/types/http'
/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */
import type { CommentListResponse } from '~/types/keyframeGoComponents'

export type getCommentListRes = https & {
	data?: CommentListResponse
}
export const getCommentList = async (
	feedId: number,
	page = 0
): Promise<getCommentListRes> => {
	return use$Get(
		`/comment/list?article_id=${feedId}&page=${page}`
	)
}

export const newComment = async (
	feedId: number,
	content: string,
	rawContent: string,
	parentId: number,
	parentUserId: number
): Promise<
	https & {
		data?: { status: string }
	}
> => {
	return use$Post(
		'/comment/new',
		JSON.stringify({
			article_id: feedId,
			content: content,
			raw_content: rawContent,
			parent_id: parentId,
			parent_user_id: parentUserId
		})
	)
}

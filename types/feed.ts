/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

export type Card = {
	title: string;
	id: number;
	media_url: string;
	media: {
		width: number;
		height: number;
	};
	view_num: number;
	like_num: number;
	loaded: boolean;
	user: {
		id: number;
		user_name: string;
		avatar: string;
	};
};

type FeedMedia = {
	width: number;
	height: number;
};

type FeedUser = {
	user_id: number;
	user_name: string;
	avatar: string;
};

export type Feed = {
	title: string;
	id: number;
	media_url: string;
	content: string;
	type: number;
	comment_num: number;
	like_num: number;
	collect_num: number;
	view_num: number;
	share_num: number;
	media: FeedMedia;
	media_list: string[];
	user: FeedUser;
	author_id: number;
	publish_time: number;
	create_time: number;
	update_time: number;
	ai_insp: number;
	ai_insp_code: number;
	insp: number;
	ip_location: string;
};
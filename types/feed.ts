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

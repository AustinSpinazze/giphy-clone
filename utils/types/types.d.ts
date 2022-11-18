export type Rating = 'y' | 'g' | 'pg' | 'pg-13' | 'r';

export interface GIF {
	type: string;
	id: string;
	slug: string;
	url: string;
	bitly_url: string;
	embed_url: string;
	username: string;
	source: string;
	rating: Rating;
	content_url: string;
	user?:
		| {
				avatar_url: string;
				banner_url: string;
				profile_url: string;
				username: string;
				display_name: string;
				twitter: string;
		  }
		| undefined;
	source_tld: string;
	source_post_url: string;
	update_datetime: string;
	create_datetime: string;
	import_datetime: string;
	trending_datetime: string;
	title: string;
	images: Images;
}

export interface Images {
	fixed_height: BaseImage & {
		size: string;
		mp4: string;
		mp4_size: string;
		webp: string;
		webp_size: string;
	};
	fixed_height_still: BaseImage;
	fixed_height_downsampled: BaseImage & {
		size: string;
		webp: string;
		webp_size: string;
	};
	fixed_width: BaseImage & {
		size: string;
		mp4: string;
		mp4_size: string;
		webp: string;
		webp_size: string;
	};
	original_still: BaseImage;
	fixed_width_still: BaseImage;
	fixed_width_downsampled: BaseImage & {
		size: string;
		webp: string;
		webp_size: string;
	};
	fixed_height_small: BaseImage & {
		size: string;
		mp4: string;
		mp4_size: string;
		webp: string;
		webp_size: string;
	};
	fixed_height_small_still: BaseImage;
	fixed_width_small: BaseImage & {
		size: string;
		mp4: string;
		mp4_size: string;
		webp: string;
		webp_size: string;
	};
	fixed_width_small_still: BaseImage;
	downsized: BaseImage & {
		size: string;
	};
	downsized_still: BaseImage;
	downsized_large: BaseImage & {
		size: string;
	};
	downsized_medium: BaseImage & {
		size: string;
	};
	downsized_small: BaseImage & {
		size: string;
	};
	original: BaseImage & {
		size: string;
		frames: string;
		mp4: string;
		mp4_size: string;
		webp: string;
		webp_size: string;
	};
	looping: { mp4: string };
	preview: {
		width: string;
		height: string;
		mp4: string;
		mp4_size: string;
	};
	preview_gif: BaseImage & {
		size: string;
	};
}

export interface BaseImage {
	url: string;
	width: string;
	height: string;
}

export interface MultiResponse extends BaseResponse {
	data: GIF[];
	pagination: { total_count: number; count: number; offset: number };
}

export interface SingleResponse extends BaseResponse {
	data: GIF;
}

export interface BaseResponse {
	meta: {
		status: number;
		msg: string;
		response_id: string;
	};
}

export interface MetaObject {
	status: number;
	msg: string;
	response_id: string;
}

export interface PaginationObject {
	total_count: number;
	count: number;
	offset: number;
}

export interface CardProps {
	gif: GIF;
}

export interface GridProps {
	gifs: GIF[];
	Card: React.FC<CardProps>;
	columns: string;
}

export interface SearchHistoryState {
	searchHistoryArray: SearchResult[];
}

export interface SearchResult {
	results: MultiResponse;
	term: string;
}

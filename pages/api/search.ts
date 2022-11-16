// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GIF, MultiResponse } from '../../utils/types/types';

type ErrorMessage = {
	message: string;
};
type Response = MultiResponse | ErrorMessage;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}
	const response = await fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.searchTerm}&limit=24&offset=0&rating=g&lang=en`
	);
	let data: MultiResponse = await response.json();
	res.status(200).json(data);
}

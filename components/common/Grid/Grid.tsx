import { GridProps } from '../../../utils/types/types';

const Grid = ({ gifs, Card, columns, direction }: GridProps) => {
	return (
		<ul>
			{gifs.map((gif, index) => {
				return (
					<li key={index}>
						<Card gif={gif} method={() => console.log('Passed')} />
					</li>
				);
			})}
		</ul>
	);
};

export default Grid;

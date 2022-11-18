import { GridProps } from '../../../utils/types/types';
import styles from './styles.module.css';

const Grid = ({ gifs, Card, columns }: GridProps) => {
	console.log(gifs);
	return (
		<ul className={`${styles.grid} ${styles[columns]}`}>
			{gifs.map((gif, index) => {
				return (
					<li key={index}>
						<Card gif={gif} />
					</li>
				);
			})}
		</ul>
	);
};

export default Grid;

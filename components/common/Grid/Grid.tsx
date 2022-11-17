import { GridProps } from '../../../utils/types/types';
import Loader from '../Loader/Loader';
import styles from './styles.module.css';

const Grid = ({ gifs, Card, columns, loading }: GridProps) => {
	return (
		<>
			{gifs.length > 0 ? (
				<ul className={`${styles.grid} ${styles[columns]}`}>
					{gifs.map((gif, index) => {
						return (
							<li key={index}>
								<Card gif={gif} />
							</li>
						);
					})}
				</ul>
			) : loading === true ? (
				<Loader />
			) : (
				<p>No GIFs found...👎</p>
			)}
		</>
	);
};

export default Grid;

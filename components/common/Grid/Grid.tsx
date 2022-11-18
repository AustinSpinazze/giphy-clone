import { GridProps } from '../../../utils/types/types';
import Loader from '../Loader/Loader';
import styles from './styles.module.css';

const Grid = ({ gifs, Card, columns, loading }: GridProps) => {
	return (
		<>
			{loading === true ? (
				<Loader />
			) : (
				<ul className={`${styles.grid} ${styles[columns]}`}>
					{gifs.map((gif, index) => {
						return (
							<li key={index}>
								<Card gif={gif} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default Grid;

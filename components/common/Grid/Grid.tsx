import { useState } from 'react';
import { GridProps } from '../../../utils/types/types';
import styles from './styles.module.css';

const Grid = ({ gifs, Card }: GridProps) => {
	useState;
	return (
		<>
			{gifs.length > 0 ? (
				<ul className={styles.grid}>
					{gifs.map((gif, index) => {
						return (
							<li key={index}>
								<Card
									gif={gif}
									method={() => console.log('Passed')}
								/>
							</li>
						);
					})}
				</ul>
			) : (
				<p>No GIFs found...</p>
			)}
		</>
	);
};

export default Grid;

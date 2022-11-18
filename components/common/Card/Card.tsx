import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { CardProps } from '../../../utils/types/types';
import { Button } from '../../index';
import styles from './styles.module.css';

const Card = ({ gif }: CardProps) => {
	const [value, copy] = useCopyToClipboard();

	return (
		<>
			{gif && (
				<article className={styles.card}>
					<video
						autoPlay={true}
						muted={true}
						loop={true}
						className={styles.video}
					>
						<source
							src={gif.images.original.mp4}
							type='video/mp4'
						/>
						<p>
							Your browser does not support HTML video. Here is a
							<a href={gif.images.original.mp4}>
								link to the video
							</a>
							instead.
						</p>
					</video>
					<div className={styles.overlay}>
						<div className={styles.overlayContent}>
							<h3>{gif.title}</h3>
							<Button
								label='Copy'
								method={() => copy(gif.images.original.url)}
								typeOfButton='button'
								size='md'
							/>
						</div>
					</div>
				</article>
			)}
		</>
	);
};

export default Card;

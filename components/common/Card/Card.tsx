import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { CardProps } from '../../../utils/types/types';
import { Button } from '../../index';
import styles from './styles.module.css';

const Card = ({ gif, method }: CardProps) => {
	const [value, copy] = useCopyToClipboard();

	return (
		<article>
			<video
				autoPlay={true}
				muted={true}
				loop={true}
				className={styles.video}
			>
				<source src={gif.images.original.mp4} type='video/mp4' />
				<p>
					Your browser does not support HTML video. Here is a
					<a href={gif.images.original.mp4}>link to the video</a>
					instead.
				</p>
			</video>
			<video />
			{/* <div>
				<h3>{gif.data.title}</h3>
				<Button
					label='Copy'
					method={() => copy(gif.data.images.original.url)}
					typeOfButton='button'
					size='md'
				/>
			</div> */}
		</article>
	);
};

export default Card;

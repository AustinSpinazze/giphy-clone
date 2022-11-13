import { CardProps } from '../../../utils/types/types';
import { Button } from '../../index';

const Card = ({ gif, method }: CardProps) => {
	return (
		<article>
			<video />
			<h3>{gif.data.title}</h3>
			<Button
				label='Copy'
				method={() => console.log('Card Button Pressed')}
				typeOfButton='button'
				size='md'
			/>
		</article>
	);
};

export default Card;

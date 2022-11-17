import { useState } from 'react';
import styles from './styles.module.css';

interface ButtonProps {
	label: string;
	method: Function;
	typeOfButton: 'submit' | 'reset' | 'button' | undefined;
	size: 'sm' | 'md' | 'lg';
}

const Button = ({ label, method, typeOfButton, size = 'md' }: ButtonProps) => {
	const [buttonState, setButtonState] = useState<boolean>(false);

	const updateButtonState = (value: boolean) => {
		setButtonState(value);
	};

	const buttonMethod = () => {
		updateButtonState(true);
		method();
		setTimeout(() => {
			updateButtonState(false);
		}, 2000);
	};

	return (
		<button
			className={`${styles.button} ${styles[size]} ${
				buttonState ? styles.copied : styles.default
			}`}
			type={typeOfButton}
			onClick={() => buttonMethod()}
		>
			{buttonState ? 'Copied!' : label}
		</button>
	);
};

export default Button;

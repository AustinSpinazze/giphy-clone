import styles from './styles.module.css';

interface ButtonProps {
	label: string;
	method: Function;
	typeOfButton: 'submit' | 'reset' | 'button' | undefined;
	size: 'xs' | 'md' | 'lg';
}

const Button = ({ label, method, typeOfButton, size }: ButtonProps) => {
	return <button type={typeOfButton}>{label}</button>;
};

export default Button;

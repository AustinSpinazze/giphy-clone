import Head from 'next/head';
import Image from 'next/image';

import historyIcon from '../../../public/time-outline.svg';
import styles from './styles.module.css';

const Header = () => {
	return (
		<div>
			<Head>
				<title>Diamond Gifs</title>
				<meta
					name='description'
					content='Diamond Gifs is a website that allows you to search for gifs'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header className={styles.header}>
				<h1>Diamond Gifs</h1>
				<Image
					src={historyIcon}
					alt='Picture of the author'
					width={35}
					height={35}
				/>
			</header>
		</div>
	);
};

export default Header;

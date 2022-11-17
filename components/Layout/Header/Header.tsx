import Head from 'next/head';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import historyIcon from '../../../public/time-outline.svg';
import { toggleDrawer } from '../../../redux/slices/drawerToggleSlice';
import styles from './styles.module.css';

const Header = () => {
	const dispatch = useDispatch();

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
					alt='Search History Icon'
					width={35}
					height={35}
					onClick={() => dispatch(toggleDrawer(true))}
					className={styles.history}
				/>
			</header>
		</div>
	);
};

export default Header;

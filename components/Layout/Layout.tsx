import { ReactElement } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

type LayoutProps = {
	children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;

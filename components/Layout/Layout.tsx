import Header from './Header/Header';

type LayoutProps = {
	children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;

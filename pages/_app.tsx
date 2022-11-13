import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { Layout } from '../components/index';
import './globals.css';

import { store } from '../redux/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

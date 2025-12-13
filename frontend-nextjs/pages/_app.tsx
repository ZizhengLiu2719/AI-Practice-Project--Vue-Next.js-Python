//global entry point for Next.js
//every page will be wrapped in this component
//this is where you can add global styles, fonts, etc.

import '../styles/globals.css';
import type { AppProps } from 'next/app';

//Component: the current page component such as Home, About, etc.
//pageProps: the props passed to the page component
export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
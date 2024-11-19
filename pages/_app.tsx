// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/app/components/layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Fallacy Bingo!</title>
                <meta name="description" content="Play bingo with logical fallacies!" />
                <link rel="icon" href="../exclamation-16.ico" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;

// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/app/components/layout';

/**
 * The main application component for the Next.js app.
 *
 * This component serves as the root component for all pages. It wraps each page component with a
 * global layout and includes metadata in the head section.
 *
 * @param {Object} props
 * @param {React.ComponentType} props.Component - The active page component being rendered.
 * @param {Object} props.pageProps - The initial props that were preloaded for the page component.
 * @returns {JSX.Element} The application component wrapping the given page component.
 */
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

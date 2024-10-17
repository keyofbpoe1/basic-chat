// pages/404.tsx
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff0000' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.5rem' }}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">
                <a style={{ fontSize: '1.2rem', color: '#0070f3' }}>Go back home</a>
            </Link>
        </div>
    );
};

export default Custom404;

// components/RootLayout.tsx
import React from 'react';

/**
 * RootLayout component that serves as the root layout for the application.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout.
 *
 * @returns {JSX.Element} The root HTML structure with the provided children.
 */
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          {/* Layout UI */}
          <main>{children}</main>
        </body>
      </html>
    )
  }
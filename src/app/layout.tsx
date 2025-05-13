import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'My professional portfolio',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
} 
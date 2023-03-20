import './globals.css';

export const metadata = {
  title: 'KNS API Doc',
  description: 'KNS API Doc and Client',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import './globals.css';
import Navigation from './components/navigation';

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
      <body>
        <div className="container">
          <div className="left-panel">
            <Navigation />
          </div>
          <div className="main-content">{children}</div>
        </div>
      </body>
    </html>
  );
}

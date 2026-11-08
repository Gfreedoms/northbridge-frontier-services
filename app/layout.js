import './styles/tokens.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/services.css';
import './styles/cta-banner.css';
import './styles/about-stats.css';
import './styles/promo.css';
import './styles/process.css';
import './styles/footer.css';

export const metadata = {
  title: 'Northbridge Frontier Services — Security Solutions in Uganda',
  description:
    'Northbridge Frontier Services Ltd provides home and corporate security, CCTV installation, storage of valuable goods, security escorts and security dog services across Uganda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

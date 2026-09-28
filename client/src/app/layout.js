import { brand } from '@/lib/brand';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';



export const metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: 'AuraMed Pharma — Care for every tomorrow.',
    template: '%s | AuraMed Pharma',
  },
  description: 'Pakistan\'s trusted online pharmacy. Quality medicines, supplements, skincare serums and health products delivered to your door. ',
  keywords: ['pharmacy pakistan', 'AuraMed Pharma', 'medicines online pakistan', 'health products pakistan', 'supplements pakistan', 'skincare pakistan'],
  authors: [{ name: 'AuraMed Pharma' }],
  creator: 'AuraMed Pharma',
  publisher: 'AuraMed Pharma',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: brand.siteUrl,
    siteName: 'AuraMed Pharma',
    title: 'AuraMed Pharma — Care for every tomorrow.',
    description: 'Pakistan\'s trusted online pharmacy. Quality medicines and health products delivered to your door.',
    images: [{ url: '/logo.png', width: 695, height: 359, alt: 'AuraMed Pharma' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraMed Pharma — Care for every tomorrow.',
    description: 'Pakistan\'s trusted online pharmacy. Quality medicines and health products delivered to your door.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-PK">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} closeOnClick pauseOnHover theme="colored" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Egyptian Slots',
  description: 'A themed slot machine game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.2/p5.min.js" strategy="beforeInteractive" />
        <Script src="/sketch.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
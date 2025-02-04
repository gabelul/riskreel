import Script from 'next/script'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.2/p5.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.2/addons/p5.sound.min.js" strategy="beforeInteractive" />
        <Script src="/helpers.js" strategy="afterInteractive" />
        <Script src="/objects.js" strategy="afterInteractive" />
        <Script src="/sketch.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
import './globals.css'

export const metadata = {
  title: 'Egyptian Slots',
  description: 'A themed slot machine game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
/* eslint-disable camelcase */
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import './globals.css'

import { DM_Sans } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-[#070815] text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}

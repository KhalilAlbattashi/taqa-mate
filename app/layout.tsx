import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Taqa Mate - Energy Consumption Insights',
  description: 'Generate energy consumption insights with actionable recommendations for your building.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-yellow-400">Taqa Mate</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}



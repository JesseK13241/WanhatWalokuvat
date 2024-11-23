import Footer from "@/components/Footer"
import Header from "@/components/Header"
import "./globals.css"

export const metadata = {
  title: "Vanhat Valokuvat",
  description:
    "Vanhat Valokuvat -sivustolla voit selata vanhoja Suomalaisia valokuvia vuosikymmenen ja sijainnin perusteella, ja testata osaamistasi erilaisten pelien avulla.",
}

export default function RootLayout({ children }) {
  // Kaikki sivut muodostetaan tämän Layout-komponentin avulla.
  // Jokaiselle sivulle tulee automaattisesti Header ja Footer.
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-primary">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

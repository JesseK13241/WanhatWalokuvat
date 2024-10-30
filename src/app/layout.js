import Footer from "../components/Footer"
import Header from "../components/Header"
import "./globals.css"

export const metadata = {
  title: "Vanhat Valokuvat",
  description:
    "Vanhat Valokuvat -sivustolla voit selata vanhoja Suomalaisia valokuvia vuosikymmenen ja sijainnin perusteella, ja testata osaamistasi erilaisten pelien avulla.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

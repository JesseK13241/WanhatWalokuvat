import "./globals.css";

export const metadata = {
  title: "TITLE TODO",
  description: "DESCRIPTION TODO"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

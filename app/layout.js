export const metadata = {
  title: "Vercel Template",
  description: "Base Layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

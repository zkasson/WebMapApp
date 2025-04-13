import { ClimbProvider } from './api/apiDisplayClimbs';   // Import your ClimbProvider
import "./globals.css";

export const metadata = {
  title: "Climb App",
  description: "App to display climbs and submit new climbs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

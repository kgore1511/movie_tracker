import { Inter } from "next/font/google";
import "./globals.css";
import PrimarySearchAppBar from "./navbar";
import { AppProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><PrimarySearchAppBar />
      <AppProvider>
      {children}
      </AppProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Calculadora de Perfumes Profissional | Clube dos Contratipos",
  description: "Sistema profissional para formulação de perfumes, fragrâncias e contratipos. Crie suas próprias bases aromáticas com químicos individuais ou use bases prontas.",
  keywords: ["perfume", "fragrância", "contratipo", "formulação", "perfumaria", "aromático"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

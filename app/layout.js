import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Prepwise | An AI Mock Interview Application",
  description: "AI Mock Interview Application",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{backgroundColor: "#0A0A0A"}}
          >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange > */}

                <Toaster/>
                {children}

          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}

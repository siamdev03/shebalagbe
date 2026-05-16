import type { Metadata } from "next";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Hind_Siliguri } from "next/font/google";

import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bangla",
});

export const metadata: Metadata = {
  title: "ShebaLagbe",
  description:
    "বাংলাদেশের বিশ্বস্ত লোকাল সার্ভিস প্ল্যাটফর্ম",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <ClerkProvider>

      <html
        lang="bn"
        data-theme="dark"
      >

        <body
          className={hindSiliguri.className}
        >

          {/* MAIN WEBSITE WRAPPER */}
          <div className="main-site">

            {children}

          </div>

          {/* GLOBAL TOASTER */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            containerStyle={{
              top: 20,
              right: 20,
            }}
            toastOptions={{

              duration: 3000,

              style: {

                background: "#0f172a",
                color: "#ffffff",
                borderRadius: "18px",
                padding: "16px 18px",
                fontSize: "15px",
                fontWeight: "600",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)",

              },

              success: {

                iconTheme: {

                  primary: "#22c55e",
                  secondary: "#ffffff",

                },

              },

              error: {

                iconTheme: {

                  primary: "#ef4444",
                  secondary: "#ffffff",

                },

              },

            }}
          />

        </body>

      </html>

    </ClerkProvider>

  );
}
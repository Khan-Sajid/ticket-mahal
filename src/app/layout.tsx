import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../styles.scss";
import StoreProvider from "@/redux/providers";
import { Provider } from "jotai";
import CommonLogicComponent from "./_commonLogicComponent/CommonLogicComponent";
import { ToastContainer } from "react-toastify";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Mahal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <StoreProvider>
          <Provider>
            <Header />
            {children}
            <Footer />
            <CommonLogicComponent />
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}

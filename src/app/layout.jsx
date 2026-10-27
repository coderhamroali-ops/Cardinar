import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import {AuthProvider} from "@/context/AuthContext";
import {CartProvider} from "@/context/CartContext";

export const metadata = {
    title: "Cardinar — авточехлы и полики в Узбекистане",
    description: "CARDINAR — самая крупная компания в Узбекистане по производству авточехлов",
};

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"/>
        </head>
        <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
            <CartProvider>
                <Header/>
                <main>{children}</main>
                <Footer/>
                <CartDrawer/>
            </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}

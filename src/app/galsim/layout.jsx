import "@/app/globals.css";


export default function RootLayout({ children }) {
    return (
        <html lang="en-US">

            <head>
                <meta charSet="utf-8" />
                <title>galsim </title>

            </head>

            <body className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
                {children}

            </body>

        </html>
    );
}
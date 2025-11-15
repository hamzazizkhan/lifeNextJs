import "@/app/globals.css";


export default function RootLayout({ children }) {
    return (
        <html lang="en-US">

            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> Game of life </title>

            </head>

            <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                {children}
            </body>

        </html>
    );
}
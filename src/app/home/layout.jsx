import './style.css'


export const metadata = {
  title: "MangoBank",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Home({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

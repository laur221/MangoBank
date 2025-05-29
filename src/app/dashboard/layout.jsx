import './user_interface.css'

export const metadata = {
  title: "Dashboard",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Dashboard({ children }) {
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

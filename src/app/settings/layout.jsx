import './settings.css'

export const metadata = {
  title: "Settings - MangoBank",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function SettingsLayout({ children }) {
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

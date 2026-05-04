import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "GSOM Indoor Map MVP",
  description: "Interactive university indoor map MVP"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

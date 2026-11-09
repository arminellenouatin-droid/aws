import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// Since we have `[locale]` as the root segment, the root layout simply passes through
export default function RootLayout({ children }: Props) {
  return children;
}

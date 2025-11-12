import { Page } from "@/components/Page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page>{children}</Page>    
  )
}

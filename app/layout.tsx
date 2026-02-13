// Root layout — minimal passthrough.
// The [locale] layout handles <html> and <body> tags.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}

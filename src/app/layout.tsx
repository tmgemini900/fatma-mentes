// Root layout — Next.js 16 requires this file to exist.
// Actual <html>/<body> structure is provided by [locale]/layout.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RootLayout({ children }: { children: React.ReactNode }): any {
  return children;
}

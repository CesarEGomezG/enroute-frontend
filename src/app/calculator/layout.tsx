export const metadata = {
  title: 'Enroute Cesar Gomez Next.js',
  description: 'React and Node application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}

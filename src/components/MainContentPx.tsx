export default function MainContentPx({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`px-[1.25rem] px--[1.5rem] md:px-0 ${className}`}>
      {children}
    </div>
  )
}
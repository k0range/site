"use client"

export default function HtmlBackgroundColor({ color }: {
  color: string
}) {
  return (
    <>
      <style jsx>{`
        html {
          background: ${color};
        }
      `}</style>
    </>
  )
}
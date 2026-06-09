"use client"

import { useState } from "react"

const fallbacks = ["📦", "🎁", "✨", "🌟", "💎", "🎨", "🔥", "🍃", "💨", "🌿"]

function getFallback(title: string) {
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = ((hash << 5) - hash) + title.charCodeAt(i)
  return fallbacks[Math.abs(hash) % fallbacks.length]
}

interface Props {
  src: string | null
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = "" }: Props) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`flex items-center justify-center bg-muted text-4xl ${className}`}>
        {getFallback(alt)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}

'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function Home() {
  useEffect(() => {
    // Only initialize p5 after all scripts are loaded
    const initP5 = () => {
      if (typeof window.p5 !== 'undefined') {
        import('/sketch.js')
      }
    }

    // Check if p5 is already loaded
    if (typeof window.p5 === 'undefined') {
      const p5Script = document.createElement('script')
      p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.2/p5.min.js'
      p5Script.onload = initP5
      document.body.appendChild(p5Script)
    } else {
      initP5()
    }
  }, [])

  return (
    <main id="sketch-container" style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000'
    }}>
    </main>
  )
}
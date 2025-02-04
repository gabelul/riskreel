'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    require('../../../public/helpers.js')
    require('../../../public/objects.js')
    require('../../../public/sketch.js')
  }, [])

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000'
    }}>
    </main>
  )
}
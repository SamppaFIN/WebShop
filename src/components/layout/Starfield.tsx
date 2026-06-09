"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number; y: number; baseX: number; baseY: number
  vx: number; vy: number; radius: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0, height = 0
    let particles: Particle[] = []
    let animationId = 0
    let mouseX = -1000, mouseY = -1000
    const PARTICLE_COUNT = 80
    const CONNECTION_DIST = 120
    const MOUSE_RADIUS = 150
    const MOUSE_FORCE = 0.02

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width
      canvas!.height = height
      initParticles()
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        particles.push({ x, y, baseX: x, baseY: y, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, radius: Math.random() * 1.5 + 0.5 })
      }
    }

    function draw() {
      if (!ctx || !canvas) return
      const isDark = document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light")
      const particleColor = isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(79, 70, 229, 0.25)"
      const glowColor = isDark ? "rgba(129, 140, 248, 0.12)" : "rgba(99, 102, 241, 0.06)"

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        const dx = p.x - mouseX, dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          p.vx += (dx / dist) * force * MOUSE_FORCE
          p.vy += (dy / dist) * force * MOUSE_FORCE
        }
        p.vx += (p.baseX - p.x) * 0.002
        p.vy += (p.baseY - p.y) * 0.002
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowColor
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${isDark ? "99,102,241" : "79,70,229"},${alpha})`
            ctx.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000 }

    resize(); draw()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ background: "transparent" }} aria-hidden="true" />
}

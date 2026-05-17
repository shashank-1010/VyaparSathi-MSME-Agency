import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── Wix Design Tokens ──────────────────────────────────────────────────────
// Wix's hero is a clean WHITE background — no dark dramatic scenes.
// Subtle floating particles in Wix Blue (#116DFF) at very low opacity.
// One soft geometric ring accent, barely visible — not dramatic.
// The 3D canvas sits behind content, purely atmospheric, not the hero itself.
// ────────────────────────────────────────────────────────────────────────────

function FloatingDots() {
  const ref = useRef<THREE.Points>(null)

  // Sparse field — Wix keeps visuals clean and airy
  const positions = useMemo(() => {
    const count = 320
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      // Very slow, gentle drift — Wix animations are never jarring
      ref.current.rotation.y = state.clock.elapsedTime * 0.018
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.012) * 0.04
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#116DFF"   // Exact Wix blue
        size={0.018}      // Smaller, more refined dots
        sizeAttenuation
        depthWrite={false}
        opacity={0.18}    // Very subtle — Wix bg is white, not dark
      />
    </Points>
  )
}

function SoftRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      // Slow, elegant rotation — Wix motion is never hyperactive
      ref.current.rotation.z = state.clock.elapsedTime * 0.08
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={ref} position={[4, 0.8, -2]}>
      <torusGeometry args={[1.4, 0.025, 8, 72]} />
      <meshBasicMaterial color="#116DFF" transparent opacity={0.08} />
    </mesh>
  )
}

function SecondRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = -state.clock.elapsedTime * 0.06
      ref.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <mesh ref={ref} position={[-4.5, -1.2, -2]}>
      <torusGeometry args={[0.9, 0.02, 6, 48]} />
      {/* Wix uses its blue only — no orange accent on white background */}
      <meshBasicMaterial color="#116DFF" transparent opacity={0.06} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      // Transparent background — the white page bg shows through
    >
      {/* No dramatic lighting needed for a white-bg scene */}
      <ambientLight intensity={0.3} />
      <FloatingDots />
      <SoftRing />
      <SecondRing />
    </Canvas>
  )
}

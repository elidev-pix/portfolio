import { useEffect, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uPx;
uniform float uSweep;
uniform vec2 uSize;
uniform float uRipT;
uniform vec2 uRipPos;
varying float vI;
varying float vA;
void main() {
  vec2 p = position.xy;
  vec2 delta = p - uMouse;
  float d = length(delta);
  vec2 dir = delta / max(d, 0.001);

  float near = smoothstep(190.0, 0.0, d) * uMouseOn;
  float ring = sin(d * 0.045 - uTime * 2.2) * exp(-d * 0.012) * uMouseOn;
  vec2 off = dir * (near * 9.0 + ring * 3.5);

  float amb = sin(p.x * 0.008 + uTime * 0.35) * sin(p.y * 0.011 - uTime * 0.28);

  float rt = uTime - uRipT;
  float rip = exp(-abs(distance(p, uRipPos) - rt * 280.0) * 0.035) * exp(-rt * 1.5);

  float sw = exp(-pow((p.x / uSize.x - uSweep) * 7.0, 2.0));

  vI = clamp(near * 0.9 + abs(ring) * 0.45 + rip + sw * 0.85, 0.0, 1.0);
  vA = 0.6 + amb * 0.22;
  gl_PointSize = (2.1 + amb * 0.5 + near * 3.0 + rip * 2.4 + sw * 2.4) * uPx;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p + off, 0.0, 1.0);
}
`

const FRAG = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uAlpha;
varying float vI;
varying float vA;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.36, r);
  vec3 col = mix(uBase, uAccent, vI);
  gl_FragColor = vec4(col, a * clamp(uAlpha * vA + vI * 0.6, 0.0, 1.0));
}
`

function cssColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return new Color(v || fallback)
}

export default function DottedGrid({ onReady, onFail }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    // Les événements pointeur sont écoutés sur la section parente : le fond est derrière le contenu.
    const evTarget = host.parentElement || host
    let renderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      onFail?.()
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const scene = new Scene()
    const camera = new OrthographicCamera(0, 1, 1, 0, -1, 1)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(-9999, -9999) },
      uMouseOn: { value: 0 },
      uPx: { value: 1 },
      uSweep: { value: reduceMotion.matches ? 2 : -0.3 },
      uSize: { value: new Vector2(1, 1) },
      uRipT: { value: -100 },
      uRipPos: { value: new Vector2(0, 0) },
      uBase: { value: new Color('#9a9a9a') },
      uAccent: { value: new Color('#2b4bff') },
      uAlpha: { value: 0.5 },
    }
    const material = new ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false })
    let points = null
    let geometry = null
    let width = 1
    let height = 1

    const applyTheme = () => {
      uniforms.uBase.value = cssColor('--grid-dot', '#9a9a9a')
      uniforms.uAccent.value = cssColor('--accent', '#2b4bff')
      uniforms.uAlpha.value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-alpha')) || 0.5
    }

    const build = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      const gap = width < 700 ? 18 : 22
      const cols = Math.ceil(width / gap) + 1
      const rows = Math.ceil(height / gap) + 1
      const offX = (width - (cols - 1) * gap) / 2
      const offY = (height - (rows - 1) * gap) / 2
      const pos = new Float32Array(cols * rows * 3)
      let i = 0
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          pos[i++] = offX + x * gap
          pos[i++] = offY + y * gap
          pos[i++] = 0
        }
      }
      if (points) { scene.remove(points); geometry.dispose() }
      geometry = new BufferGeometry()
      geometry.setAttribute('position', new BufferAttribute(pos, 3))
      points = new Points(geometry, material)
      points.frustumCulled = false
      scene.add(points)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, false)
      uniforms.uPx.value = dpr
      uniforms.uSize.value.set(width, height)
      camera.left = 0; camera.right = width; camera.top = height; camera.bottom = 0
      camera.updateProjectionMatrix()
    }

    // Pointeur : coordonnées relatives à l'hôte, axe Y inversé pour Three.
    const target = new Vector2(-9999, -9999)
    let inside = false
    let lastInput = performance.now()
    const toLocal = (e) => {
      const r = host.getBoundingClientRect()
      target.set(e.clientX - r.left, r.height - (e.clientY - r.top))
    }
    const onMove = (e) => {
      toLocal(e)
      inside = true
      lastInput = performance.now()
    }
    const onLeave = () => { inside = false }
    const onDown = (e) => {
      toLocal(e)
      uniforms.uRipPos.value.copy(target)
      uniforms.uRipT.value = uniforms.uTime.value
      inside = true
      lastInput = performance.now()
    }

    let raf = 0
    let visible = true
    let running = false
    const clock0 = performance.now()
    const renderFrame = () => renderer.render(scene, camera)

    const tick = (now) => {
      if (!running) return
      const t = (now - clock0) / 1000
      uniforms.uTime.value = t
      if (uniforms.uSweep.value < 1.4) uniforms.uSweep.value = -0.3 + t * 0.85
      // Sans pointeur (mobile) ou après inactivité : un point lumineux dérive doucement.
      const idle = coarse || now - lastInput > 4000
      if (idle) {
        target.set(width * (0.5 + 0.38 * Math.sin(t * 0.23)), height * (0.5 + 0.3 * Math.sin(t * 0.31 + 1.3)))
      }
      const on = idle ? (coarse ? 0.55 : 0.4) : inside ? 1 : 0
      const m = uniforms.uMouse.value
      if (m.x < -9000) m.copy(target)
      m.lerp(target, 0.12)
      uniforms.uMouseOn.value += (on - uniforms.uMouseOn.value) * 0.06
      renderFrame()
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running || reduceMotion.matches || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    const staticFrame = () => { uniforms.uSweep.value = 2; uniforms.uMouseOn.value = 0; renderFrame() }
    const refresh = () => { applyTheme(); if (reduceMotion.matches) staticFrame() }

    applyTheme()
    build()
    if (reduceMotion.matches) staticFrame()
    else start()
    onReady?.()

    const ro = new ResizeObserver(() => { build(); if (reduceMotion.matches) staticFrame() })
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start(); else stop()
    })
    io.observe(host)
    const mo = new MutationObserver(refresh)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const onVis = () => { if (document.hidden) stop(); else start() }
    const onMotion = () => { if (reduceMotion.matches) { stop(); staticFrame() } else start() }
    document.addEventListener('visibilitychange', onVis)
    reduceMotion.addEventListener('change', onMotion)
    evTarget.addEventListener('pointermove', onMove, { passive: true })
    evTarget.addEventListener('pointerleave', onLeave)
    evTarget.addEventListener('pointerdown', onDown, { passive: true })

    return () => {
      stop()
      ro.disconnect(); io.disconnect(); mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      reduceMotion.removeEventListener('change', onMotion)
      evTarget.removeEventListener('pointermove', onMove)
      evTarget.removeEventListener('pointerleave', onLeave)
      evTarget.removeEventListener('pointerdown', onDown)
      geometry?.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} className="grid-canvas" aria-hidden="true" />
}

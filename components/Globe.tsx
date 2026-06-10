"use client";

import { useEffect, useRef } from "react";

const TW = 1024;
const TH = 512;
const D = 320; // internal sphere render resolution
// light direction (view space), pre-normalized-ish
const LX = 0.4;
const LY = 0.45;
const LZ = 0.8;

/**
 * Real colored Earth painted onto a sphere via per-pixel texture mapping on a
 * 2D canvas. Free 360° drag, atmosphere rim and pulsing markers. No libraries.
 */
export default function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // rotation state (both axes)
    let rotY = 0;
    let rotX = -0.3;
    let velY = 0.0022;
    let velX = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const lenis = () => (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = 0;
      velX = 0;
      canvas.setPointerCapture(e.pointerId);
      lenis()?.stop();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      velY = dx * 0.0008;
      velX = dy * 0.0008;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      lenis()?.start();
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);

    const d2r = (d: number) => (d * Math.PI) / 180;
    const fromLatLon = (lat: number, lon: number) => {
      const la = d2r(lat), lo = d2r(lon);
      return { x: Math.cos(la) * Math.cos(lo), y: Math.sin(la), z: Math.cos(la) * Math.sin(lo) };
    };
    const markers = [
      fromLatLon(25, 55), fromLatLon(48, 8), fromLatLon(10, -84), fromLatLon(1, 103), fromLatLon(40, -74),
    ];
    const rotate = (p: { x: number; y: number; z: number }, ry: number, rx: number) => {
      const x = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      const z0 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
      const y = p.y * Math.cos(rx) - z0 * Math.sin(rx);
      const z = p.y * Math.sin(rx) + z0 * Math.cos(rx);
      return { x, y, z };
    };

    // offscreen sphere buffer
    const sphere = document.createElement("canvas");
    sphere.width = D;
    sphere.height = D;
    const sctx = sphere.getContext("2d");
    const sImg = sctx ? sctx.createImageData(D, D) : null;
    const buf = sImg ? sImg.data : null;
    const rD = D / 2;

    let texData: Uint8ClampedArray | null = null;

    const renderSphere = (ry: number, rx: number) => {
      if (!texData || !buf || !sctx || !sImg) return;
      const cry = Math.cos(ry), sry = Math.sin(ry), crx = Math.cos(rx), srx = Math.sin(rx);
      buf.fill(0);
      for (let py = 0; py < D; py++) {
        const ny = (py + 0.5 - rD) / rD;
        const ny2 = ny * ny;
        for (let px = 0; px < D; px++) {
          const nx = (px + 0.5 - rD) / rD;
          const d2 = nx * nx + ny2;
          if (d2 > 1) continue;
          const nz = Math.sqrt(1 - d2);
          const vx = nx, vy = -ny, vz = nz;
          // inverse-rotate view point → model point
          const y1 = vy * crx + vz * srx;
          const z1 = -vy * srx + vz * crx;
          const mx = vx * cry - z1 * sry;
          const mz = vx * sry + z1 * cry;
          const my = y1;
          const lat = Math.asin(my);
          const lon = Math.atan2(mz, mx);
          let tx = ((lon + Math.PI) / (2 * Math.PI) * TW) | 0;
          let ty = ((Math.PI / 2 - lat) / Math.PI * TH) | 0;
          if (tx < 0) tx = 0; else if (tx >= TW) tx = TW - 1;
          if (ty < 0) ty = 0; else if (ty >= TH) ty = TH - 1;
          const ti = (ty * TW + tx) * 4;
          let sh = 0.45 + 0.72 * Math.max(0, vx * LX + vy * LY + vz * LZ);
          if (sh > 1.2) sh = 1.2;
          const oi = (py * D + px) * 4;
          buf[oi] = texData[ti] * sh;
          buf[oi + 1] = texData[ti + 1] * sh;
          buf[oi + 2] = texData[ti + 2] * sh;
          buf[oi + 3] = 255;
        }
      }
      sctx.putImageData(sImg, 0, 0);
    };

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 1;
      if (!dragging) {
        rotY += velY;
        velY += (0.0022 - velY) * 0.02;
        rotX += velX;
        velX *= 0.9;
      }
      renderSphere(rotY, rotX);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cx = size / 2, cy = size / 2, R = size * 0.42;

      // atmosphere glow
      const g = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(79,124,254,0)");
      g.addColorStop(0.55, "rgba(79,124,254,0.18)");
      g.addColorStop(1, "rgba(74,222,222,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // the earth
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(sphere, cx - R, cy - R, R * 2, R * 2);

      // crisp rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(125,214,246,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // pulsing markers
      markers.forEach((m, i) => {
        const q = rotate(m, rotY, rotX);
        if (q.z < 0.02) return;
        const sx = cx + q.x * R, sy = cy - q.y * R;
        const pulse = Math.sin(t * 0.05 + i * 1.3) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 3 + pulse * 9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74,222,222,${(0.6 * (1 - pulse)).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(74,222,222,0.95)";
        ctx.fill();
      });

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    // load earth texture (same-origin → safe to read pixels)
    const img = new Image();
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = TW;
      off.height = TH;
      const o = off.getContext("2d");
      if (!o) return;
      o.drawImage(img, 0, 0, TW, TH);
      try {
        texData = o.getImageData(0, 0, TW, TH).data;
      } catch {
        return;
      }
      draw();
    };
    img.src = "/earth-blue-marble.jpg";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", aspectRatio: "1 / 1", cursor: "grab", touchAction: "none" }}
      aria-label="Interactive Earth globe of Cloud Taktiks' global presence"
    />
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHiddenRoute = pathname?.startsWith("/admin") || pathname === "/login";

  useEffect(() => {
    if (isHiddenRoute) return;

    // --- Fire Ember Particles (Canvas) ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let particles: Ember[] = [];
    let animationFrameId: number;

    function rand(a: number, b: number) { return a + Math.random() * (b - a); }

    class Ember {
      x!: number; y!: number; size!: number; speedY!: number; speedX!: number; life!: number; decay!: number; color!: string;
      constructor() { this.reset(); }
      reset(initial = false) {
        this.x = rand(0, W);
        this.y = initial ? rand(0, H) : H + rand(20, 80);
        this.size = rand(1.5, 4);
        this.speedY = rand(0.6, 2.2);
        this.speedX = rand(-0.5, 0.5);
        this.life = 1;
        this.decay = rand(0.003, 0.008);
        const r = Math.floor(rand(200, 255));
        const g = Math.floor(rand(40, 120));
        this.color = `rgb(${r},${g},0)`;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        this.size *= 0.998;
        if (this.life <= 0 || this.y < -20) this.reset();
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 80; i++) {
      const p = new Ember();
      p.reset(true);
      particles.push(p);
    }

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(ctx!); });
      animationFrameId = requestAnimationFrame(loop);
    }
    loop();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- Scroll reveal ---
    // Note: We run this slightly after render to ensure DOM is ready.
    const timeoutId = setTimeout(() => {
      const allReveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 90);
            revealObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      allReveals.forEach(el => revealObs.observe(el));
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [isHiddenRoute, pathname]);

  return (
    <>
      {!isHiddenRoute && (
        <canvas
          ref={canvasRef}
          id="fire-canvas"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.35,
          }}
        />
      )}
      {!isHiddenRoute && <Navbar />}
      <main className={isHiddenRoute ? "w-full min-h-screen" : ""}>{children}</main>
      {!isHiddenRoute && <Footer />}
    </>
  );
}

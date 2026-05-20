"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Mail,
  MessageCircle,
  Instagram,
  X,
  ChevronDown,
  ExternalLink,
  Menu,
  Palette,
  Megaphone,
  Share2,
  CreditCard,
  Globe,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

/* ─── color tokens ─── */
const NAVY = "#282A3A";
const CYAN = "#00B8D4";
const CYAN_DARK = "#00838F";
const CYAN_LIGHT = "#4DD0E1";

/* ─── data ─── */
const SECTIONS = [
  { id: "construmedia", label: "Revista Construmedia", icon: BookOpen },
  { id: "identidad", label: "Identidad Corporativa", icon: Palette },
  { id: "publicidad", label: "Diseño Publicitario", icon: Megaphone },
  { id: "redes", label: "Contenido para Redes", icon: Share2 },
  { id: "tarjetas", label: "Tarjetas de Presentación", icon: CreditCard },
  { id: "web", label: "Diseño de Páginas Web", icon: Globe },
];

const IDENTIDAD = {
  aureaApis: [
    "/identidad-corporativa/aurea-apis/Image 1.png",
    "/identidad-corporativa/aurea-apis/Image 2.png",
    "/identidad-corporativa/aurea-apis/Image 3.png",
    "/identidad-corporativa/aurea-apis/Image 4.png",
  ],
  mkn: [
    "/identidad-corporativa/mkn/Image 8.png",
    "/identidad-corporativa/mkn/Image 10.png",
    "/identidad-corporativa/mkn/Image 11.png",
    "/identidad-corporativa/mkn/Image 119.png",
    "/identidad-corporativa/mkn/Image 12.png",
    "/identidad-corporativa/mkn/Image 13.png",
    "/identidad-corporativa/mkn/Image 14.png",
    "/identidad-corporativa/mkn/Image 15.png",
    "/identidad-corporativa/mkn/Image 16.png",
    "/identidad-corporativa/mkn/Image 17.png",
    "/identidad-corporativa/mkn/Image 18.png",
    "/identidad-corporativa/mkn/Image 20.png",
  ],
};

const PUBLICIDAD = [
  "/diseno-publicitario/15M_060.jpg",
  "/diseno-publicitario/3762266.jpg",
  "/diseno-publicitario/37622662.jpg",
  "/diseno-publicitario/banner chefcalo.jpg",
  "/diseno-publicitario/flyer.jpg",
];

const REDES = {
  barbaDeAaron: [
    "/contenido-redes/barba-de-aaron/Post 1 - Reflexivo.jpg",
    "/contenido-redes/barba-de-aaron/Post 2 - Cuidado de Barba.jpg",
    "/contenido-redes/barba-de-aaron/Post 3 - Comparacion.jpg",
    "/contenido-redes/barba-de-aaron/Post 4 - Espiritual Marca.jpg",
  ],
  foodUniverse: [
    "/contenido-redes/food-universe/Screen Shot 2022-02-25 at 4.56.18 PM.png",
    "/contenido-redes/food-universe/Screen Shot 2022-02-25 at 4.56.38 PM.png",
    "/contenido-redes/food-universe/Screen Shot 2022-02-25 at 5.01.20 PM.png",
  ],
  safva: [
    "/contenido-redes/safva/WhatsApp Image 2026-04-21 at 9.57.57 AM.jpeg",
    "/contenido-redes/safva/WhatsApp Image 2026-04-21 at 9.57.57 AM(1).jpeg",
    "/contenido-redes/safva/WhatsApp Image 2026-04-21 at 9.57.57 AM(2).jpeg",
    "/contenido-redes/safva/WhatsApp Image 2026-04-21 at 9.57.57 AM(3).jpeg",
    "/contenido-redes/safva/WhatsApp Image 2026-04-21 at 9.57.57 AM(4).jpeg",
    "/contenido-redes/safva/WhatsApp Image 2026-05-17 at 12.51.44 PM.jpeg",
  ],
};

const TARJETAS = [
  "/tarjetas-presentacion/Business-Card-Mockup-Vol-01.jpg",
  "/tarjetas-presentacion/tarjeta apskin.jpg",
  "/tarjetas-presentacion/TARJETALUXURY.jpg",
];

const WEB_PROJECTS = [
  {
    title: "Safva Consulting & Research",
    url: "https://safvacr.com",
    image: "/web/safva-cr.png",
    description:
      "Sitio web profesional para consultora de investigación. Diseño limpio y moderno con enfoque en usabilidad y presentación de servicios.",
  },
  {
    title: "LR Óptica",
    url: "https://648129e1019c8.site123.me/",
    image: "/web/lr-optica.png",
    description:
      "Página web para óptica con catálogo de productos, información de servicios y contacto integrado.",
  },
];

const CONSTRUMEDIA_EDITIONS = [
  {
    title: "Revista Especializada Edic. 97",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_94cbcf88ecc000",
    cover: "/revista-construmedia/ed-97.jpg",
  },
  {
    title: "Revista Especializada Edic. 95",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_01176bf4b9418b",
    cover: "/revista-construmedia/ed-95.jpg",
  },
  {
    title: "Revista Especializada Edic. 92",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_edic_92",
    cover: "/revista-construmedia/ed-92.jpg",
  },
  {
    title: "Revista Especializada Edic. 87",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_edic_87",
    cover: "/revista-construmedia/ed-87.jpg",
  },
  {
    title: "Revista Especializada Edic. 86",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_edic_86",
    cover: "/revista-construmedia/ed-86.jpg",
  },
  {
    title: "Revista Especializada Edic. 85",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_ed_85",
    cover: "/revista-construmedia/ed-85.jpg",
  },
  {
    title: "Revista Especializada Edic. 84",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_ed_84",
    cover: "/revista-construmedia/ed-84.jpg",
  },
  {
    title: "Revista Especializada Edic. 83",
    issuu: "https://issuu.com/construmediarevista/docs/revista_especializada_construmedia_ed_83",
    cover: "/revista-construmedia/ed-83.jpg",
  },
];

/* ─── reusable components ─── */

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-oswald), sans-serif", color: NAVY }}
      >
        {title}
      </h2>
      <div className="section-divider mt-2" />
      {subtitle && (
        <p className="mt-2 text-gray-500 text-sm md:text-base max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Modal (shared) ─── */
function ImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-5xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-cyan-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
            <Image
              src={src}
              alt="Vista ampliada"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Horizontal Ribbon Gallery (like Construmedia) ─── */
function RibbonGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-4">
      <h3
        className="text-base font-semibold mb-2 flex items-center gap-2"
        style={{ color: NAVY }}
      >
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{ backgroundColor: CYAN }}
        />
        {title}
      </h3>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex-shrink-0 cursor-pointer group"
              style={{ scrollSnapAlign: "start" }}
              onClick={() => setModalSrc(src)}
            >
              <div className="w-40 md:w-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gray-100">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 40vw, 192px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: NAVY }} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
        >
          <ChevronRight className="w-4 h-4" style={{ color: NAVY }} />
        </button>
      </div>
      {/* Modal */}
      {modalSrc && <ImageModal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </div>
  );
}

/* ─── Standalone ribbon (no sub-title, single row) ─── */
function SingleRibbon({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="relative mt-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex-shrink-0 cursor-pointer group"
              style={{ scrollSnapAlign: "start" }}
              onClick={() => setModalSrc(src)}
            >
              <div className="w-40 md:w-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gray-100">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={src}
                    alt={`Proyecto ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 40vw, 192px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: NAVY }} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
        >
          <ChevronRight className="w-4 h-4" style={{ color: NAVY }} />
        </button>
      </div>
      {/* Modal */}
      {modalSrc && <ImageModal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FJ Diseño & Media"
            width={52}
            height={52}
            className="rounded"
          />
          <span
            className="hidden sm:inline text-sm font-bold tracking-wide"
            style={{ fontFamily: "var(--font-oswald)", color: NAVY }}
          >
            FJ DISEÑO &amp; MEDIA
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors hover:bg-gray-100"
              style={{ color: NAVY }}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contacto")}
            className="ml-2 px-4 py-1.5 text-xs font-bold rounded-full text-white transition-transform hover:scale-105"
            style={{ backgroundColor: CYAN }}
          >
            Contacto
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-3 rounded-lg active:bg-white/20 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" style={{ color: scrolled ? NAVY : "#fff" }} />
          ) : (
            <Menu className="w-6 h-6" style={{ color: scrolled ? NAVY : "#fff" }} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t shadow-xl overflow-hidden fixed top-16 left-0 right-0 z-50"
          >
            <div className="p-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  style={{ color: NAVY }}
                >
                  <s.icon className="w-5 h-5" style={{ color: CYAN }} />
                  {s.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contacto")}
                className="mt-2 py-3 rounded-lg text-sm font-bold text-white transition-colors"
                style={{ backgroundColor: CYAN }}
              >
                Contacto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      id="hero"
      className="hero-pattern min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: NAVY }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
        style={{ backgroundColor: CYAN }}
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: CYAN }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logo.png"
            alt="FJ Diseño & Media"
            width={150}
            height={150}
            className="mx-auto mb-6 rounded-xl shadow-2xl"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          JONATHAN <span style={{ color: CYAN }}>FLORES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Identidad corporativa, publicidad, contenido digital y diseño web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105"
              style={{
                borderColor: CYAN,
                color: CYAN,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CYAN;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = CYAN;
              }}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <button
            onClick={() =>
              document.getElementById("construmedia")?.scrollIntoView({ behavior: "smooth" })
            }
            className="animate-bounce text-white/50 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sobre Mí ─── */
function SobreMi() {
  return (
    <section id="sobre-mi" className="py-8 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="SOBRE MÍ"
          subtitle="Profesional apasionado por los nuevos retos y la creatividad visual."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              Soy diseñador gráfico y creador de contenido visual, enfocado en desarrollar piezas modernas, funcionales y estratégicas para marcas, medios y negocios. Me apasiona transformar ideas en conceptos visuales que conecten con las personas y aporten valor a cada proyecto.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mi enfoque combina creatividad, comunicación y diseño digital, trabajando áreas como identidad visual, contenido para redes sociales, diseño editorial, publicidad y desarrollo web. Siempre busco mantenerme en constante evolución, explorando nuevas tendencias, herramientas y formas de comunicar visualmente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Software */}
            <div className="rounded-xl p-5 bg-white border border-gray-200">
              <h3 className="font-bold mb-3 text-lg" style={{ color: NAVY }}>
                Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Photoshop", "Illustrator", "InDesign", "Premiere",
                  "WordPress", "Wix", "Canva", "Cap Cut", "Filmora",
                  "Camtasia", "Hootsuite", "Figma",
                ].map((sw) => (
                  <span
                    key={sw}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${CYAN}15`,
                      color: CYAN_DARK,
                      border: `1px solid ${CYAN}30`,
                    }}
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Servicios ─── */
function Servicios() {
  const servicios = [
    {
      icon: BookOpen,
      title: "Diseño Editorial",
      desc: "Maquetación y diseño de revistas, catálogos, periódicos y publicaciones impresas o digitales con estándares profesionales.",
    },
    {
      icon: Palette,
      title: "Identidad Corporativa",
      desc: "Creación de logos, manuales de marca, papelería y sistemas visuales que comunican la esencia de cada negocio.",
    },
    {
      icon: Megaphone,
      title: "Diseño Publicitario",
      desc: "Piezas publicitarias como flyers, banners, anuncios y materiales promocionales que captan la atención y generan resultados.",
    },
    {
      icon: Share2,
      title: "Contenido para Redes",
      desc: "Diseño de posts, stories, carruseles y contenido visual estratégico para redes sociales que conecta con tu audiencia.",
    },
    {
      icon: CreditCard,
      title: "Tarjetas de Presentación",
      desc: "Diseño de tarjetas profesionales y papelería corporativa que representan tu marca con elegancia y distinción.",
    },
    {
      icon: Globe,
      title: "Diseño de Páginas Web",
      desc: "Sitios web profesionales, funcionales y optimizados, desde landings hasta páginas corporativas completas.",
    },
  ];

  return (
    <section id="servicios" className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="SERVICIOS"
          subtitle="Soluciones creativas y profesionales para hacer que tu marca destaque."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {servicios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-xl p-6 border border-gray-200 bg-white hover:border-cyan-300 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: `${CYAN}15` }}
              >
                <s.icon className="w-6 h-6" style={{ color: CYAN }} />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: NAVY, fontFamily: "var(--font-oswald)" }}
              >
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Identidad Corporativa ─── */
function IdentidadCorporativa() {
  return (
    <section id="identidad" className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="IDENTIDAD CORPORATIVA"
          subtitle="Creación de identidades visuales que comunican la esencia de cada marca."
        />
        <RibbonGallery title="Aurea Apis" images={IDENTIDAD.aureaApis} />
        <RibbonGallery title="MKN" images={IDENTIDAD.mkn} />
      </div>
    </section>
  );
}

/* ─── Diseño Publicitario ─── */
function DisenoPublicitario() {
  return (
    <section id="publicidad" className="py-8 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="DISEÑO PUBLICITARIO"
          subtitle="Piezas publicitarias que captan la atención y generan resultados."
        />
        <SingleRibbon images={PUBLICIDAD} />
      </div>
    </section>
  );
}

/* ─── Contenido para Redes Sociales ─── */
function ContenidoRedes() {
  return (
    <section id="redes" className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="CONTENIDO PARA REDES SOCIALES"
          subtitle="Estrategia visual para redes sociales que conecta con tu audiencia."
        />
        <RibbonGallery title="Barba de Aaron" images={REDES.barbaDeAaron} />
        <RibbonGallery title="Food Universe" images={REDES.foodUniverse} />
        <RibbonGallery title="Safva Consulting & Research" images={REDES.safva} />
      </div>
    </section>
  );
}

/* ─── Tarjetas de Presentación ─── */
function TarjetasPresentacion() {
  return (
    <section id="tarjetas" className="py-8 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="TARJETAS DE PRESENTACIÓN"
          subtitle="Diseño de tarjetas profesionales que representan tu marca con elegancia."
        />
        <SingleRibbon images={TARJETAS} />
      </div>
    </section>
  );
}

/* ─── Diseño de Páginas Web ─── */
function DisenoWeb() {
  return (
    <section id="web" className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="DISEÑO DE PÁGINAS WEB"
          subtitle="Sitios web profesionales, funcionales y optimizados para tus objetivos."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {WEB_PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
            >
              {/* Screenshot */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-top object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-sm font-medium">Visitar sitio</span>
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Info */}
              <div className="p-4 bg-white">
                <h3
                  className="font-bold text-lg mb-1"
                  style={{ color: NAVY, fontFamily: "var(--font-oswald)" }}
                >
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Revista Construmedia ─── */
function RevistaConstrumedia() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <section id="construmedia" className="py-8 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="DISEÑO EDITORIAL"
          subtitle="Maquetación y diseño editorial."
        />
        <div className="relative mt-4">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {CONSTRUMEDIA_EDITIONS.map((ed, i) => (
              <motion.a
                key={ed.title}
                href={ed.issuu}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex-shrink-0 group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="w-44 md:w-52 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                    <Image
                      src={ed.cover}
                      alt={ed.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 220px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-2 bg-white text-center">
                    <p className="text-xs font-semibold" style={{ color: NAVY }}>
                      {ed.title}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" style={{ color: NAVY }} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" style={{ color: NAVY }} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Contacto ─── */
function Contacto() {
  const contactItems = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Jonathan Flores",
      href: "https://www.linkedin.com/in/jonathan-flores-rodriguez-11a0aa7a/",
    },
    {
      icon: Mail,
      label: "Email",
      value: "jonathan.flrod@gmail.com",
      href: "mailto:jonathan.flrod@gmail.com",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "829-319-6108",
      href: "https://wa.me/18293196108",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@jonathan.flrod",
      href: "https://instagram.com/jonathan.flrod",
    },
  ];

  return (
    <section id="contacto" className="py-8 md:py-10" style={{ backgroundColor: NAVY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          CONTACTO
        </h2>
        <div className="section-divider mx-auto mb-6" />
        <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm">
          ¿Tienes un proyecto en mente? Conectemos y hagamos que tu marca destaque.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105"
              style={{
                borderColor: `${CYAN}40`,
                backgroundColor: `${CYAN}08`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = CYAN;
                e.currentTarget.style.backgroundColor = `${CYAN}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${CYAN}40`;
                e.currentTarget.style.backgroundColor = `${CYAN}08`;
              }}
            >
              <item.icon className="w-6 h-6" style={{ color: CYAN }} />
              <span className="text-xs text-gray-400">{item.label}</span>
              <span className="text-sm text-white font-medium">{item.value}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer
      className="py-4 text-center border-t"
      style={{ backgroundColor: "#1E2030", borderColor: `${CYAN}20` }}
    >
      <p className="text-gray-500 text-xs">
        © {new Date().getFullYear()} FJ Diseño &amp; Media — Todos los derechos reservados
      </p>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SobreMi />
      <Servicios />
      <RevistaConstrumedia />
      <IdentidadCorporativa />
      <DisenoPublicitario />
      <ContenidoRedes />
      <TarjetasPresentacion />
      <DisenoWeb />
      <Contacto />
      <Footer />
    </main>
  );
}

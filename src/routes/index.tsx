import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, LayoutTemplate, Film, Sparkles, Gauge, Type, Send, X, Check, ShieldCheck, Search } from "lucide-react";
import qrAsset from "@/assets/aba-qr.png.asset.json";
import { categories, products, discountPct, fmt, TELEGRAM_URL, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KHDigiStore — Digital Services & Templates | សេវាកម្មឌីជីថល" },
      { name: "description", content: "Telegram shop bots, Khmer templates, fonts, video editing and AI consultation from Cambodia. Pay with Bakong KHQR." },
      { property: "og:title", content: "KHDigiStore — Digital Services & Templates" },
      { property: "og:description", content: "Khmer templates, fonts, bots, video editing and AI consultation. Pay with Bakong KHQR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = { bot: Bot, layout: LayoutTemplate, film: Film, sparkles: Sparkles, gauge: Gauge, type: Type };

function Index() {
  const [cat, setCat] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [order, setOrder] = useState<Product | null>(null);
  const q = query.trim().toLowerCase();
  const list = products
    .filter((p) => cat === "all" || p.category === cat)
    .filter((p) => !q || `${p.name} ${p.badge} ${p.features.join(" ")}`.toLowerCase().includes(q));

  return (
    <div className="min-h-screen bg-background text-foreground lux-bg">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="font-display text-2xl tracking-wide">
          KH<span className="text-gold">Digi</span>Store
        </div>
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-ghost-lux text-sm">
          <Send size={16} /> ជំនួយ · Support
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan">សេវាកម្មឌីជីថល · Digital Services</p>
        <h1 className="font-display mx-auto mt-5 max-w-3xl text-5xl leading-tight md:text-6xl">
          Crafted in Cambodia. <span className="text-gradient-lux">Built to sell.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Bots, Khmer templates, fonts and creative services — pay instantly with Bakong KHQR.
        </p>
      </section>

      <main id="products" className="mx-auto max-w-6xl px-6 pb-40 md:pb-28">
        <div className="input-lux mx-auto mb-6 max-w-md">
          <Search size={18} className="shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search · ស្វែងរក..."
            aria-label="Search products"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={cat === c.id ? "tab-lux tab-lux-active" : "tab-lux"}>
              <span className="block text-sm font-medium">{c.en}</span>
              <span className="block text-xs opacity-70">{c.km}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <article key={p.id} className="card-lux animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="banner-lux">
                  <Icon size={44} strokeWidth={1.4} className="text-cyan" />
                  <span className="badge-gold">{p.badge}</span>
                  <span className="badge-cyan">-{discountPct(p)}%</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {categories.find((c) => c.id === p.category)?.en} · {categories.find((c) => c.id === p.category)?.km}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{p.name}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{f}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <div>
                      <div className="text-sm text-muted-foreground line-through">{fmt(p.original)}</div>
                      <div className="font-display text-3xl text-gold">{fmt(p.price)}</div>
                    </div>
                    <button onClick={() => setOrder(p)} className="btn-lux">បញ្ជាទិញ · Order Now</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No products match your search · រកមិនឃើញ</p>
        )}
      </main>

      <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" aria-label="Telegram support" className="fab-telegram">
        <Send size={24} />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 px-4 py-3 backdrop-blur md:hidden">
        <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="btn-lux w-full">
          បញ្ជាទិញ · Order Now
        </button>
      </div>

      {order && <OrderModal product={order} onClose={() => setOrder(null)} />}
    </div>
  );
}

function OrderModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "pay">("phone");
  const valid = /^0?\d{8,9}$/.test(phone.replace(/\s/g, ""));
  const ref = `KHD-${product.id}-${phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="modal-lux w-full max-w-md animate-rise" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Order">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan">ការបញ្ជាទិញ · Checkout</p>
            <h3 className="mt-1 font-semibold">{product.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground"><X /></button>
        </div>

        {step === "phone" ? (
          <div className="mt-6">
            <label className="text-sm text-muted-foreground" htmlFor="phone">លេខទូរស័ព្ទ · Phone number</label>
            <div className="input-lux mt-2">
              <span className="text-muted-foreground">+855</span>
              <input id="phone" inputMode="tel" placeholder="12 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent outline-none" />
            </div>
            <button disabled={!valid} onClick={() => setStep("pay")} className="btn-lux mt-6 w-full disabled:opacity-40">
              បន្ត · Continue — {fmt(product.price)}
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <div className="khqr-card mx-auto">
              <div className="khqr-head">KHQR</div>
              <div className="p-5">
                <p className="text-left text-xs text-muted-foreground">KHDigiStore</p>
                <p className="text-left font-display text-2xl">{fmt(product.price)}</p>
                <div className="mt-3 rounded-lg bg-qr p-3"><img src={qrAsset.url} alt="ABA Bakong KHQR" width={180} height={180} className="mx-auto block" /></div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Scan with any Bakong app · ស្កេនជាមួយកម្មវិធី Bakong</p>
            <p className="mt-1 text-xs text-muted-foreground">Ref: {ref}</p>
            <a href={`${TELEGRAM_URL}?text=${encodeURIComponent(`Paid ${fmt(product.price)} for ${product.name}. Ref ${ref}`)}`} target="_blank" rel="noreferrer" className="btn-lux mt-6 w-full">
              <ShieldCheck size={18} /> ផ្ញើវិក្កយបត្រ · Send receipt on Telegram
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

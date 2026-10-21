import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Search, Send, Check, ShieldCheck, Globe2, SlidersHorizontal, X, ShoppingBag, Code2, Layers, Clapperboard, Sparkles, Grid2X2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderModal } from "@/components/order-modal";
import hero from "@/assets/studio-hero.jpg";
import { productArt } from "@/lib/product-art";
import { categories, products, discountPct, fmt, TELEGRAM_URL, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "KHDigiStore Studio — Digital craft, made for you" },
    { name: "description", content: "Discover Khmer design templates, custom Telegram bots, fonts and creative services. A digital studio in Cambodia with ABA Bakong payments." },
    { property: "og:title", content: "KHDigiStore Studio — Digital craft, made for you" },
    { property: "og:description", content: "Explore creative services, Khmer templates and digital tools from KHDigiStore Cambodia." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});
const categoryIcons = { all: Grid2X2, tech: Code2, templates: Layers, creative: Clapperboard, consult: Sparkles };
function Index() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [order, setOrder] = useState<Product | null>(null);
  const q = query.trim().toLowerCase();
  const list = products.filter(p => cat === "all" || p.category === cat).filter(p => !q || `${p.name} ${p.badge} ${p.features.join(" ")}`.toLowerCase().includes(q)).sort((a,b) => sort === "low" ? a.price-b.price : sort === "high" ? b.price-a.price : 0);
  const browse = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  return <div className="min-h-screen bg-background text-foreground">
    <div className="announcement"><span className="status-dot" /> Digital craft, made in Cambodia <span className="hidden sm:inline text-muted-foreground">·</span><span className="hidden sm:inline">ស្នាដៃឌីជីថល សម្រាប់អ្នក</span><ArrowUpRight size={13} /></div>
    <header className="site-header">
      <div className="page-width flex h-20 items-center justify-between gap-4">
        <a href="#" className="flex shrink-0 items-center gap-3" aria-label="KHDigiStore home"><span className="brand-symbol">K<span /></span><span className="text-lg font-semibold">KHDigiStore<span className="mt-0.5 block text-[9px] font-normal text-muted-foreground">D I G I T A L &nbsp; S T U D I O</span></span></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation"><a href="#products" className="nav-link text-foreground">Collection</a><a href="#studio" className="nav-link">Our studio</a><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="nav-link">Contact <ArrowUpRight size={12} /></a></nav>
        <Button asChild variant="outline" className="h-10 gap-2 border-border bg-transparent px-3 sm:px-4"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer"><Send /><span className="hidden sm:inline">Let’s talk</span><span className="sm:hidden">Support</span></a></Button>
      </div>
    </header>
    <section className="studio-hero" aria-labelledby="store-title">
      <img src={hero} width={1920} height={1024} fetchPriority="high" alt="KHDigiStore creative studio with digital design mockups and premium materials" className="hero-art" />
      <div className="hero-shade" />
      <div className="page-width relative z-10">
        <div className="hero-copy">
          <p className="eyebrow"><span className="small-line" /> THE INDEPENDENT DIGITAL STUDIO</p>
          <h1 id="store-title" className="hero-title">KHDigiStore<span className="block font-normal text-gold">Small details.<br />Big possibilities.</span></h1>
          <p className="mt-6 text-base text-muted-foreground">Thoughtful templates. Clever tools. Creative expertise.<br className="hidden sm:block" /> Everything your next big idea deserves.</p>
          <p className="mt-3 text-sm text-muted-foreground">បង្កើតអ្វីដែលអស្ចារ្យ ជាមួយសេវាកម្មឌីជីថលរបស់យើង</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><Button onClick={browse} className="h-12 px-6">Explore collection <ArrowUpRight /></Button><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-cyan">Have a project? <ArrowRight size={16} /></a></div>
          <div className="hero-note"><span className="status-dot" /> Khmer & English <span className="text-border">/</span> ABA Bakong accepted</div>
        </div>
      </div>
      <span className="hero-caption">CREATIVE THINKING. DIGITAL POSSIBILITIES. — EST. CAMBODIA</span>
    </section>
    <div className="benefit-band"><div className="page-width grid grid-cols-1 sm:grid-cols-3"><div><ShieldCheck /><span>Secure Bakong payments</span></div><div><Globe2 /><span>Crafted for Khmer creators</span></div><div><Send /><span>Personal Telegram support</span></div></div></div>
    <main id="products" className="page-width collection-section">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-cyan">THE COLLECTION / 01</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Your next great idea starts here.</h2><p className="mt-3 text-sm text-muted-foreground">ស្វែងរកសេវាកម្ម និងផលិតផលឌីជីថលសម្រាប់អ្នក</p></div><span className="text-xs text-muted-foreground">{products.length.toString().padStart(2,"0")} CURATED OFFERINGS</span></div>
      <div className="collection-controls">
        <div className="category-list" aria-label="Product categories">{categories.map(c => { const Icon=categoryIcons[c.id]; return <Button key={c.id} variant="ghost" aria-pressed={cat===c.id} onClick={() => setCat(c.id)} className={`category-tab ${cat===c.id ? "category-active" : ""}`}><Icon /><span>{c.id === "all" ? "All products" : c.en}</span><span className="category-count">{c.id === "all" ? products.length : products.filter(p => p.category===c.id).length}</span></Button>; })}</div>
        <div className="search-field search-products"><Search size={17} className="shrink-0 text-muted-foreground" /><input type="search" aria-label="Search products" placeholder="Search · ស្វែងរក..." value={query} onChange={e => setQuery(e.target.value)} className="w-full min-w-0 bg-transparent text-sm outline-none" />{query && <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" aria-label="Clear search" onClick={() => setQuery("")}><X /></Button>}</div>
      </div>
      <div className="mb-6 mt-5 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>Showing {list.length} of {products.length} offerings</span><div className="flex items-center gap-2"><SlidersHorizontal size={13} /><div className="relative"><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)} className="cursor-pointer appearance-none bg-transparent py-1 pr-5 text-foreground outline-none"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown size={12} className="pointer-events-none absolute right-0 top-2" /></div></div></div>
      <div className="product-grid">{list.map(p => <ProductCard key={p.id} product={p} onOrder={() => setOrder(p)} />)}</div>
      {list.length===0 && <div className="py-20 text-center"><Search className="mx-auto mb-4 text-muted-foreground" /><h3 className="text-xl">No products match your search · រកមិនឃើញ</h3><Button variant="outline" className="mt-5" onClick={() => {setQuery("");setCat("all");}}>Reset filters</Button></div>}
    </main>
    <section id="studio" className="studio-band"><div className="page-width flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-cyan">FROM AN IDEA TO SOMETHING REAL</p><h2 className="mt-4 font-display text-3xl sm:text-4xl">A little ambition.<br /><span className="text-gold">A creative partner.</span></h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">Custom bots, a fresh visual identity, or a smarter workflow.<br />Let’s make your next project unmistakably yours.</p></div><Button asChild variant="outline" className="h-12 self-start border-gold/40 text-gold md:self-auto"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Talk about your project <ArrowUpRight /></a></Button></div></section>
    <footer className="page-width footer"><div className="flex flex-wrap items-center justify-between gap-6"><span className="font-semibold">KHDigiStore<span className="ml-2 text-sm font-normal text-muted-foreground">/ Digital Studio</span></span><div className="flex gap-6 text-xs text-muted-foreground"><span>Phnom Penh, Cambodia</span><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-cyan">Telegram ↗</a></div></div><div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground"><span>© {new Date().getFullYear()} KHDigiStore. Crafted with intention.</span><span>USD pricing · ABA / Bakong KHQR</span></div></footer>
    <Button asChild size="icon" className="telegram-fab" title="Telegram support"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" aria-label="Telegram support"><Send className="size-5" /></a></Button>
    <div className="mobile-order-bar"><div className="text-xs"><span className="block text-muted-foreground">Made for your next idea</span><span className="mt-1 block font-medium">ឌីជីថល សម្រាប់អ្នក</span></div><Button onClick={browse} className="h-11 px-5"><ShoppingBag /> បញ្ជាទិញ · Order</Button></div>
    {order && <OrderModal product={order} onClose={() => setOrder(null)} />}
  </div>;
}
function ProductCard({ product: p, onOrder }: {product: Product; onOrder: () => void}) {
  const category=categories.find(c=>c.id===p.category);
  return <article className="product-card group"><div className="product-image"><img src={productArt[p.id]} alt={`${p.name} — illustrative studio artwork`} width={512} height={512} loading="lazy" /><span className="product-badge">{p.badge}</span><span className="discount-badge">−{discountPct(p)}%</span></div><div className="flex flex-1 flex-col p-5 sm:p-6"><p className="mb-3 text-[10px] uppercase text-cyan">{category?.en} <span className="text-muted-foreground">/ {category?.km}</span></p><h3 className="product-title">{p.name}</h3><ul className="mt-4 space-y-2">{p.features.map(f=><li key={f} className="flex gap-2 text-xs leading-relaxed text-muted-foreground"><Check size={13} className="mt-0.5 shrink-0 text-cyan" />{f}</li>)}</ul><div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-5 mt-6"><div><span className="text-2xl font-semibold">{fmt(p.price)}</span><span className="ml-2 text-xs text-muted-foreground line-through">{fmt(p.original)}</span><span className="mt-1 block text-[10px] text-muted-foreground">One-time purchase · USD</span></div><Button onClick={onOrder} variant="outline" aria-label={`Order ${p.name}`} className="h-10 border-border bg-transparent px-3 group-hover:border-gold/50 group-hover:text-gold">Order <ArrowUpRight /></Button></div></div></article>;
}

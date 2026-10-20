export type Category = "tech" | "templates" | "creative" | "consult";

export const categories: { id: Category | "all"; en: string; km: string }[] = [
  { id: "all", en: "All", km: "ទាំងអស់" },
  { id: "tech", en: "Tech & Bots", km: "បច្ចេកវិទ្យា & Bot" },
  { id: "templates", en: "Templates", km: "គំរូរចនា" },
  { id: "creative", en: "Creative Services", km: "សេវាកម្មរចនា" },
  { id: "consult", en: "Consultation", km: "ប្រឹក្សាយោបល់" },
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  original: number;
  badge: string;
  icon: "bot" | "layout" | "film" | "sparkles" | "gauge" | "type";
  features: string[];
};

export const products: Product[] = [
  { id: "telegram-bot", name: "Custom Telegram Shop Bot Setup", category: "tech", price: 49, original: 99, badge: "Bestseller", icon: "bot",
    features: ["Automated Bakong KHQR integration", "Admin alerts", "24/7 Cloud hosting"] },
  { id: "social-templates", name: "Khmer Luxury Social Media Templates Pack (300+ Designs)", category: "templates", price: 9.99, original: 29.99, badge: "Hot Deal", icon: "layout",
    features: ["High-res vector graphics", "Customizable Khmer fonts", "Commercial license"] },
  { id: "video-editing", name: "Professional Video Editing & Motion Graphics Service", category: "creative", price: 19, original: 45, badge: "Popular", icon: "film",
    features: ["4K 60fps color grading", "Dynamic sound design", "Subtitle synchronization"] },
  { id: "ai-consult", name: "AI Workflow & Automation Consultation (1-on-1)", category: "consult", price: 25, original: 50, badge: "VIP Service", icon: "sparkles",
    features: ["Custom business workflow design", "Prompt engineering", "Private session"] },
  { id: "seo-speed", name: "E-Commerce Landing Page Speed & SEO Optimization", category: "tech", price: 35, original: 80, badge: "Pro Tier", icon: "gauge",
    features: ["95+ Google PageSpeed score", "Mobile responsiveness", "SSL hardening"] },
  { id: "khmer-fonts", name: "Khmer Modern Font Bundle (20 Commercial Fonts)", category: "templates", price: 7.99, original: 19.99, badge: "Creator Choice", icon: "type",
    features: ["Webfont OTF/TTF/WOFF2 formats", "Full Khmer Unicode support"] },
];

export const discountPct = (p: Product) => Math.round((1 - p.price / p.original) * 100);
export const fmt = (n: number) => `$${n.toFixed(2)}`;
export const TELEGRAM_URL = "https://t.me/Vanarich1669";

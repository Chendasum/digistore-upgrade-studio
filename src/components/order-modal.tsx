import { useState } from "react";
import { ArrowRight, ArrowLeft, Send, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import qrAsset from "@/assets/aba-qr.png.asset.json";
import { fmt, TELEGRAM_URL, type Product } from "@/lib/catalog";

export function OrderModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "pay">("phone");
  const valid = /^0?\d{8,9}$/.test(phone.replace(/\s/g, ""));
  const ref = `KHD-${product.id}-${phone.replace(/\s/g, "")}`;
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="checkout-dialog max-w-md max-h-[90dvh] overflow-y-auto rounded-lg border-border bg-card p-6 sm:p-8">
        <div className="mb-1 flex items-center gap-2 text-xs text-cyan"><LockKeyhole size={14} /> KHDIGISTORE CHECKOUT</div>
        <DialogTitle className="pr-5 font-display text-2xl leading-snug">{step === "phone" ? "Make it yours." : "Complete your order."}</DialogTitle>
        <DialogDescription>{product.name}</DialogDescription>
        <div className="flex items-center justify-between border-y border-border py-4"><span className="text-sm text-muted-foreground">Order total · សរុប</span><span className="text-xl font-semibold text-gold">{fmt(product.price)}</span></div>
        {step === "phone" ? (
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setStep("pay"); }} className="space-y-5">
            <div><label htmlFor="phone" className="mb-2 block text-sm">លេខទូរស័ព្ទ · Phone number</label><div className="search-field"><span className="border-r border-border pr-3 text-muted-foreground">+855</span><input autoFocus id="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="12 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="min-w-0 w-full bg-transparent outline-none" /></div></div>
            <Button type="submit" disabled={!valid} className="h-12 w-full">បន្ត · Continue <ArrowRight /></Button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-56 rounded-md bg-qr p-2"><img src={qrAsset.url} alt="Official ABA Bakong KHQR" width={224} height={224} className="block h-auto w-full" /></div>
            <p className="mt-4 text-sm">Scan with ABA or Bakong · ស្កេនដើម្បីបង់ប្រាក់</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Pay {fmt(product.price)}, then send your receipt on Telegram.</p>
            <p className="mt-2 break-all text-[11px] text-muted-foreground">Ref: {ref}</p>
            <Button asChild className="mt-5 h-auto min-h-12 w-full whitespace-normal py-3"><a href={`${TELEGRAM_URL}?text=${encodeURIComponent(`Order ${product.name}. Amount ${fmt(product.price)}. Ref ${ref}`)}`} target="_blank" rel="noreferrer"><Send /> ផ្ញើវិក្កយបត្រ · Send receipt</a></Button>
            <Button variant="ghost" className="mt-2" onClick={() => setStep("phone")}><ArrowLeft /> Back</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
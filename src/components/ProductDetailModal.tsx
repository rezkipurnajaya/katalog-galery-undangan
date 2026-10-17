import React, { useState } from 'react';
import { X, MessageCircle, Heart, Share2, Check, Sparkles, Layers, Palette, Folder, Maximize2, ShieldCheck } from 'lucide-react';
import type { UndanganItem, PriceSegment } from '../types/catalog.ts';
import { GeneratedCardCover } from './GeneratedCardCover.tsx';
import { generateWhatsAppLink } from '../utils/filterAndSort.ts';

interface ProductDetailModalProps {
  item: UndanganItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const SEGMENT_CONFIG: Record<PriceSegment, { title: string; badge: string; description: string }> = {
  'Super Hemat': {
    title: 'Super Hemat',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    description: 'Pilihan paling bersahabat dan terjangkau, cocok untuk kebutuhan cetak dalam jumlah besar tanpa mengurangi estetika momen bahagia Anda.',
  },
  'Ekonomis': {
    title: 'Ekonomis',
    badge: 'bg-sky-100 text-sky-900 border-sky-300',
    description: 'Keseimbangan ideal antara kualitas bahan blangko dan efisiensi biaya, menjadi favorit banyak calon pengantin.',
  },
  'Menengah': {
    title: 'Menengah',
    badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    description: 'Tampilan elegan dengan aksen ornamen berkelas dan bahan premium untuk sentuhan undangan yang anggun dan berkesan.',
  },
  'Premium': {
    title: 'Premium',
    badge: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
    description: 'Kategori mahakarya termewah dengan finishing eksklusif, kelengkapan amplop spesial, dan material blangko standar atelier tertinggi.',
  },
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const segInfo = SEGMENT_CONFIG[item.segmenHarga] || SEGMENT_CONFIG['Ekonomis'];
  const waLink = generateWhatsAppLink(item);

  const handleShare = () => {
    const text = `Katalog Blangko Undangan UD REZ WAN JAYA - Seri ${item.series} No ${item.nomorKode}`;
    if (navigator.share) {
      navigator.share({
        title: text,
        text: `${text} (Kategori Segmen: ${item.segmenHarga})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} - ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-[#faf8f5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-serif font-bold tracking-widest text-amber-800 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              UD REZ WAN JAYA
            </span>
            <span className="text-xs text-stone-500 font-medium">Spesifikasi Model</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'text-stone-400 hover:text-rose-600 hover:bg-white border-transparent'
              }`}
              title="Favoritkan model ini"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-white rounded-lg transition-colors border border-transparent"
              title="Bagikan model ini"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-white rounded-lg transition-colors border border-transparent"
              aria-label="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Cover Preview */}
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-50">
              <GeneratedCardCover item={item} aspectClass="aspect-[3/4]" />
            </div>

            {/* Product Metadata & Specifications */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 font-serif">
                    Seri Blangko Undangan
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono font-bold text-stone-800">
                    No. {item.nomorKode}
                  </span>
                </div>

                <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900 tracking-tight">
                  {item.series} - {item.nomorKode}
                </h2>

                {/* Segmen Harga Highlight Box (NO NUMERIC PRICE) */}
                <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                      Kategori Segmen
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${segInfo.badge}`}
                    >
                      {segInfo.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                    {segInfo.description}
                  </p>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Warna Dominan</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{item.warnaDominan}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Warna Sekunder</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{item.warnaSekunder || '-'}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Model Lipatan</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{item.lipatan}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Orientasi</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{item.orientasi}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 col-span-2">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Kelengkapan Amplop</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{item.amplop}</span>
                </div>
              </div>

              {/* Guarantees note */}
              <div className="flex items-center gap-2 text-stone-500 text-[11px] pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Blangko resmi cetak UD REZ WAN JAYA berkualitas tinggi.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500 text-center sm:text-left">
            Ingin tanya stok blangko model ini?
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

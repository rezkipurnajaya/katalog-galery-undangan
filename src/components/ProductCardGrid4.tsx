import React from 'react';
import { Eye, MessageCircle, Heart, Sparkles } from 'lucide-react';
import type { UndanganItem, PriceSegment } from '../types/catalog.ts';
import { GeneratedCardCover } from './GeneratedCardCover.tsx';
import { generateWhatsAppLink, getColorHex } from '../utils/filterAndSort.ts';

interface ProductCardGrid4Props {
  item: UndanganItem;
  onOpenDetail: (item: UndanganItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const SEGMENT_BADGES: Record<PriceSegment, { label: string; badgeClass: string; dotClass: string }> = {
  'Super Hemat': {
    label: 'Super Hemat',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
    dotClass: 'bg-emerald-500',
  },
  'Ekonomis': {
    label: 'Ekonomis',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-300/80',
    dotClass: 'bg-sky-500',
  },
  'Menengah': {
    label: 'Menengah',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-300/80',
    dotClass: 'bg-indigo-500',
  },
  'Premium': {
    label: 'Premium',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300/90 font-bold',
    dotClass: 'bg-amber-500',
  },
};

export const ProductCardGrid4: React.FC<ProductCardGrid4Props> = ({
  item,
  onOpenDetail,
  isFavorite,
  onToggleFavorite,
}) => {
  const segInfo = SEGMENT_BADGES[item.segmenHarga] || SEGMENT_BADGES['Ekonomis'];
  const waLink = generateWhatsAppLink(item);

  // Ukuran margin & layout cover diseragamkan menjadi Potrait (3:4) untuk seluruh kartu
  const aspectClass = 'aspect-[3/4]';

  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 hover:border-amber-400/70 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Cover */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onOpenDetail(item)}>
        <GeneratedCardCover item={item} aspectClass={aspectClass} />

        {/* Floating Top Left: Segmen Harga Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-xs ${segInfo.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${segInfo.dotClass}`} />
            {segInfo.label}
          </span>
        </div>

        {/* Floating Top Right: Favorite Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-xs ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 text-stone-600 hover:text-rose-500 hover:bg-white'
            }`}
            title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            aria-label="Favoritkan"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick hover overlay hint */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/90 text-stone-900 font-serif text-xs font-bold shadow-md">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Series & Kode Title */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700">
                Seri Blangko
              </span>
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-tight">
                {item.series}
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono font-bold text-stone-800">
              #{item.nomorKode}
            </span>
          </div>

          {/* Specs Tags */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1 text-[11px] text-stone-600">
            <span className="px-2 py-0.5 rounded bg-stone-50 border border-stone-200/80">
              {item.lipatan}
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-50 border border-stone-200/80">
              {item.orientasi}
            </span>
            <span
              className={`px-2 py-0.5 rounded border ${
                item.amplop.toLowerCase().includes('dengan')
                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                  : 'bg-stone-50 border-stone-200/80'
              }`}
            >
              {item.amplop}
            </span>
          </div>

          {/* Colors Tag with Overlapping Dual Color Swatches */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold shrink-0">Warna:</span>
              <span className="font-medium text-stone-800 text-[11px] truncate">
                {item.warnaDominan}
                {item.warnaSekunder && item.warnaSekunder.toLowerCase() !== item.warnaDominan.toLowerCase()
                  ? ` & ${item.warnaSekunder}`
                  : ''}
              </span>
            </div>

            {/* Lingkaran kecil warna dominan yang beririsan dengan warna sekunder */}
            <div
              className="flex items-center -space-x-1.5 shrink-0 ml-2"
              title={`Warna Dominan: ${item.warnaDominan}${item.warnaSekunder ? `, Sekunder: ${item.warnaSekunder}` : ''}`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-stone-300/90 shadow-2xs relative z-10"
                style={{ backgroundColor: getColorHex(item.warnaDominan) }}
              />
              <span
                className="w-3.5 h-3.5 rounded-full border border-stone-300/90 shadow-2xs relative z-20"
                style={{ backgroundColor: getColorHex(item.warnaSekunder || item.warnaDominan) }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons: Detail & WhatsApp */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetail(item)}
            className="flex-1 py-1.5 px-2.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Detail</span>
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Tanya WA</span>
          </a>
        </div>
      </div>
    </article>
  );
};

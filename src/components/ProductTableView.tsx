import React from 'react';
import { Eye, MessageCircle, Heart } from 'lucide-react';
import type { UndanganItem, PriceSegment } from '../types/catalog.ts';
import { GeneratedCardCover } from './GeneratedCardCover.tsx';
import { generateWhatsAppLink } from '../utils/filterAndSort.ts';

interface ProductTableViewProps {
  items: UndanganItem[];
  onOpenDetail: (item: UndanganItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const SEGMENT_BADGES: Record<PriceSegment, { label: string; badgeClass: string }> = {
  'Super Hemat': { label: 'Super Hemat', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
  'Ekonomis': { label: 'Ekonomis', badgeClass: 'bg-sky-50 text-sky-800 border-sky-300' },
  'Menengah': { label: 'Menengah', badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-300' },
  'Premium': { label: 'Premium', badgeClass: 'bg-amber-50 text-amber-900 border-amber-300 font-bold' },
};

const COLOR_MAP: Record<string, string> = {
  'putih': '#ffffff',
  'krem': '#f5ede0',
  'kuning / emas': '#d4af37',
  'cokelat': '#5d4037',
  'hitam': '#1c1917',
  'hijau': '#1b4d3e',
  'biru': '#1e3a8a',
  'pink': '#f472b6',
  'merah': '#991b1b',
  'ungu': '#6b21a8',
  'abu-abu': '#64748b',
};

export const ProductTableView: React.FC<ProductTableViewProps> = ({
  items,
  onOpenDetail,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#faf8f5] text-stone-600 font-semibold border-b border-stone-200 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3 text-center w-12">#</th>
              <th className="py-3 px-3 w-16">SAMPEL</th>
              <th className="py-3 px-3">Seri</th>
              <th className="py-3 px-3">Kode</th>
              <th className="py-3 px-3">Warna</th>
              <th className="py-3 px-3">Lipatan</th>
              <th className="py-3 px-3">Orientasi</th>
              <th className="py-3 px-3">Amplop</th>
              <th className="py-3 px-3">Kategori Segmen</th>
              <th className="py-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
            {items.map((item, idx) => {
              const seg = SEGMENT_BADGES[item.segmenHarga] || SEGMENT_BADGES['Ekonomis'];
              const isFav = favorites.includes(item.id);
              const waLink = generateWhatsAppLink(item);
              const colorHex = COLOR_MAP[item.warnaDominan.toLowerCase()] || '#d4af37';

              return (
                <tr
                  key={item.id}
                  className="hover:bg-amber-50/40 transition-colors group"
                >
                  {/* Row Index */}
                  <td className="py-2.5 px-3 text-center text-stone-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>

                  {/* Thumbnail */}
                  <td className="py-2 px-3">
                    <div
                      onClick={() => onOpenDetail(item)}
                      className="w-12 h-14 rounded overflow-hidden border border-stone-200 cursor-pointer shadow-2xs group-hover:scale-105 transition-transform"
                    >
                      <GeneratedCardCover item={item} aspectClass="w-full h-full" />
                    </div>
                  </td>

                  {/* Seri */}
                  <td className="py-2.5 px-3">
                    <span className="font-serif font-bold text-stone-900 group-hover:text-amber-800 text-sm">
                      {item.series}
                    </span>
                  </td>

                  {/* Nomor Kode */}
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-stone-100 font-mono font-bold text-stone-700 text-xs border border-stone-200">
                      {item.nomorKode}
                    </span>
                  </td>

                  {/* Warna */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-stone-300 shrink-0 shadow-2xs"
                        style={{ backgroundColor: colorHex }}
                        title={item.warnaDominan}
                      />
                      <span>{item.warnaDominan}</span>
                      {item.warnaSekunder && (
                        <span className="text-stone-400 text-[10px]">({item.warnaSekunder})</span>
                      )}
                    </div>
                  </td>

                  {/* Lipatan */}
                  <td className="py-2.5 px-3 text-stone-600">
                    {item.lipatan}
                  </td>

                  {/* Orientasi */}
                  <td className="py-2.5 px-3 text-stone-600">
                    {item.orientasi}
                  </td>

                  {/* Amplop */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.amplop.toLowerCase().includes('dengan')
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {item.amplop}
                    </span>
                  </td>

                  {/* Segmen Harga (CRITICAL: NEVER print numeric IDR) */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${seg.badgeClass}`}
                    >
                      {seg.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'text-stone-400 hover:text-rose-600 hover:bg-stone-50 border-transparent hover:border-stone-200'
                        }`}
                        title="Favorit"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-amber-800 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 transition-colors"
                        title="Lihat Detail Model"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-2xs"
                        title="Tanya ketersediaan via WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span className="hidden sm:inline">WA</span>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
